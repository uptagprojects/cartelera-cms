export interface FileStorage {
	save(path: string, file: File): Promise<string>;

	remove(path: string): Promise<void>;
}
