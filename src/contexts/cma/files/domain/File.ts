import { FileContent } from "./FileContent";
import { FileId } from "./FileId";
import { FileURL } from "./FileURL";

export type FilePrimitives = {
	id: string;
	url: string;
};

export class File {
	constructor(
		readonly id: FileId,
		readonly content: FileContent,
		private url: FileURL
	) {}

	static create(id: string, content: Buffer, extension: string): File {
		return new File(
			new FileId(id),
			new FileContent(content),
			new FileURL(`/files/${id}${extension}`)
		);
	}

	static fromPrimitives(primitives: FilePrimitives): File {
		return new File(
			new FileId(primitives.id),
			new FileContent(Buffer.from("")),
			new FileURL(primitives.url)
		);
	}

	toPrimitives(): FilePrimitives {
		return {
			id: this.id.value,
			url: this.url.value
		};
	}

	updateURL(url: string): void {
		this.url = new FileURL(url);
	}
}
