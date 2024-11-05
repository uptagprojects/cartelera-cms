export abstract class FileStorage {
	abstract save(path: string, file: File): Promise<string>;

	abstract remove(path: string): Promise<void>;
}
