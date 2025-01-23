import { StoredFile } from "./StoredFile";

export abstract class FileStorageConnection {
	abstract search(path: string): Promise<StoredFile | null>;
	abstract upload(path: string, content: Buffer): Promise<void>;
	abstract remove(path: string): Promise<void>;
}
