import fetch from "node-fetch";
import { Dropbox, DropboxAuth } from "dropbox";

export interface DropboxFileMetadata {
	id: string;
	size: number;
	revision: string;
	previewUrl: string;
}

export class DropboxConnection {
	private dropboxInstance: Dropbox | null = null;
	private dropboxAuth: DropboxAuth | null = null;

	private get dbx(): Dropbox {
		if (!this.dropboxAuth) {
			this.dropboxAuth = new DropboxAuth({
                fetch,
				clientId: process.env.DROPBOX_API_KEY ?? "dropbox-api-key",
				clientSecret: process.env.DROPBOX_API_SECRET ?? "dropbox-api-secret",
                refreshToken: process.env.DROPBOX_REFRESH_TOKEN ?? "refresh-token"
			});
		}

        
        this.dropboxAuth.checkAndRefreshAccessToken();

		if (!this.dropboxInstance) {
			this.dropboxInstance = new Dropbox({
                fetch,
				auth: this.dropboxAuth
			});
		}

		return this.dropboxInstance;
	}

	async upload(path: string, contents: Buffer): Promise<DropboxFileMetadata> {
		const uploadedFile = await this.dbx.filesUpload({
			path: `${path}`,
			contents
		});

		return {
			id: uploadedFile.result.id,
			size: uploadedFile.result.size,
			revision: uploadedFile.result.rev,
			previewUrl: uploadedFile.result.preview_url as string
		};
	}

	private async refreshAccess(): Promise<void> {
        return new Promise((res, _) => {
            setTimeout(() => {
                this.dropboxAuth?.refreshAccessToken();
                res();
            }, 5000);
        });
	}

	async listFolder(path: string): Promise<DropboxFileMetadata[]> {
		const res = await this.dbx.filesListFolder({
			path
		});

		const files = res.result.entries.filter(f => f[".tag"] === "file");

		return files.map(
			f =>
				({
					id: f.id,
					name: f.name,
					size: f.size,
					revision: f.rev,
					previewUrl: f.preview_url
				}) as DropboxFileMetadata
		);
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
}
