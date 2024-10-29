import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { File } from "../../domain/File";
import { FileRepository } from "../../domain/FileRepository";

export class FileUploader {
	constructor(
		private readonly uuidGenerator: UuidGenerator,
		private readonly repository: FileRepository
	) {}

	async upload(content: Buffer, extension: string): Promise<File> {
		const file = File.create(await this.uuidGenerator.generate(), content, extension);

		await this.repository.save(file);

		return file;
	}
}
