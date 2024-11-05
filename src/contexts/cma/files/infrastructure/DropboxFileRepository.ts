import path from "path";

import { DropboxConnection } from "../../../shared/infrastructure/file-storage/dropbox/DropboxConnection";
import { File as DomainFile } from "../domain/File";
import { FileRepository } from "../domain/FileRepository";

export class DropboxFileRepository implements FileRepository {
	constructor(private readonly connection: DropboxConnection) {}

	async save(file: DomainFile): Promise<void> {
		const primitives = file.toPrimitives();
		const extension = path.extname(primitives.url);

		const result = await this.connection.upload(
			`/files/${primitives.id}${extension}`,
			file.content.value
		);

		const url = await this.connection.share(result.id);

		if (url) {
			file.updateURL(url);
		}
	}

	async search(id: string, extension: string): Promise<DomainFile | null> {
		const res = await this.connection.search(`/files/${id}${extension}`);
		if (!res) {
			return null;
		}

		return DomainFile.fromPrimitives({
			id,
			url: res.previewUrl
		});
	}
}
