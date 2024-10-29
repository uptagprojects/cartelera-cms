import { FileContent } from "./FileContent";
import { FileExtension } from "./FileExtension";
import { FileId } from "./FileId";

export class File {
	constructor(
		readonly id: FileId,
        readonly extension: FileExtension,
		readonly content: FileContent
	) {}

	static create(id: string, extension: string, content: Buffer): File {
		return new File(new FileId(id), new FileExtension(extension), new FileContent(content));
	}
}
