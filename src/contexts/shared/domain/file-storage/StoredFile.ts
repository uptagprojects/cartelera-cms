export class StoredFile {
	constructor(
		public readonly path: string,
		public readonly url: string
	) {}

	static fromPrimitives(path: string, url: string): StoredFile {
		return new StoredFile(path, url);
	}
}
