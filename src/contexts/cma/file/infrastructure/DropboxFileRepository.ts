import { DropboxConnection } from "../../../shared/infrastructure/DropboxConnection";
import { File as DomainFile } from "../domain/File";
import { FileRepository } from "../domain/FileRepository";

export class DropboxFileRepository implements FileRepository {
	constructor(private readonly connection: DropboxConnection) {}

	async save(file: DomainFile): Promise<string> {
		const result = await this.connection.upload(`/files/${file.id.value}${file.extension.value}`, file.content.value);
        console.log("result");
        console.log(result);
		return result.previewUrl;
	}
}
