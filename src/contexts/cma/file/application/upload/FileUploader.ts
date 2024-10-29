import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { File } from "../../domain/File";
import { FileRepository } from "../../domain/FileRepository";

export class FileUploader {
	constructor(
		private readonly uuidGenerator: UuidGenerator,
		private readonly repository: FileRepository
	) {}

	async upload(content: Buffer, extension: string): Promise<string> {
		const file = File.create(await this.uuidGenerator.generate(), extension, content);

		return this.repository.save(file);
	}
}
