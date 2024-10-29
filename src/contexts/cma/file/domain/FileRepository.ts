import { File } from "./File";

export interface FileRepository {
	save(file: File): Promise<string>;
}
