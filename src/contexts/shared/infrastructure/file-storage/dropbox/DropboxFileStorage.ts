import { Service } from "diod";

import { FileStorage } from "../../../domain/FileStorage";
import { DropboxConnection } from "./DropboxConnection";

@Service()
export class DropboxFileStorage implements FileStorage {
	constructor(private readonly connection: DropboxConnection) {}

	async save(path: string, file: File): Promise<string> {
		const content = await file.arrayBuffer();

		const result = await this.connection.upload(path, Buffer.from(content));
		const url = await this.connection.share(path);

		return url;
	}

	async remove(path: string): Promise<void> {
		await this.connection.remove(path);
	}
}
