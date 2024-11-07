import { Service } from "diod";
import { Dropbox, DropboxAuth } from "dropbox";

export interface DropboxFileMetadata {
	id: string;
	size: number;
	revision: string;
	previewUrl: string;
}

@Service()
export class DropboxConnection {
	private dropboxInstance: Dropbox | null = null;
	private dropboxAuth: DropboxAuth | null = null;

	private get dbx(): Dropbox {
		if (!this.dropboxAuth) {
			this.dropboxAuth = new DropboxAuth({
				fetch: global.fetch,
				clientId: process.env.DROPBOX_API_KEY ?? "dropbox-api-key",
				clientSecret: process.env.DROPBOX_API_SECRET ?? "dropbox-api-secret",
				refreshToken: process.env.DROPBOX_REFRESH_TOKEN ?? "refresh-token"
			});
		}

		this.dropboxAuth.checkAndRefreshAccessToken();

		if (!this.dropboxInstance) {
			this.dropboxInstance = new Dropbox({
				fetch: global.fetch,
				auth: this.dropboxAuth
			});
		}

		return this.dropboxInstance;
	}

	async upload(path: string, contents: Buffer): Promise<DropboxFileMetadata> {
		const uploadedFile = await this.dbx.filesUpload({
			path: `${path}`,
			autorename: false,
			mode: { ".tag": "overwrite" },
			contents
		});

		return {
			id: uploadedFile.result.id,
			size: uploadedFile.result.size,
			revision: uploadedFile.result.rev,
			previewUrl: uploadedFile.result.preview_url as string
		};
	}

	async search(path: string): Promise<DropboxFileMetadata | null> {
		const res = await this.dbx.filesGetMetadata({
			path
		});

		if (res.result[".tag"] !== "file") {
			return null;
		}

		return {
			id: res.result.id,
			size: res.result.size,
			revision: res.result.rev,
			previewUrl: res.result.preview_url as string
		};
	}

	async remove(path: string): Promise<void> {
		await this.dbx.filesDeleteBatch({
			entries: [
				{
					path
				}
			]
		});
	}

	async share(path: string): Promise<string> {
		const links = await this.dbx.sharingListSharedLinks({
			path
		});

		if (links.result.links.length > 0) {
			return links.result.links[0].url;
		}

		const res = await this.dbx.sharingCreateSharedLinkWithSettings({
			path,
			settings: {
				require_password: false,
				access: { ".tag": "viewer" },
				allow_download: true,
				audience: { ".tag": "public" }
			}
		});

		return res.result.url;
	}
}
