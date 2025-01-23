import { Service } from "diod";
import { Dropbox, DropboxAuth } from "dropbox";

import { FileStorageConnection } from "../../domain/file-storage/FileStorageConnection";
import { StoredFile } from "../../domain/file-storage/StoredFile";

@Service()
export class DropboxConnection extends FileStorageConnection {
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

	async upload(path: string, contents: Buffer): Promise<void> {
		await this.dbx.filesUpload({
			path: `${path}`,
			autorename: false,
			mode: { ".tag": "overwrite" },
			contents
		});
	}

	async search(path: string): Promise<StoredFile | null> {
		const res = await this.dbx.filesGetMetadata({
			path
		});

		if (res.result[".tag"] !== "file") {
			return null;
		}

		const url = await this.share(path);

		return StoredFile.fromPrimitives(path, url);
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

	private async share(path: string): Promise<string> {
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
