import { UC } from "../../domain/UC";
import { UCDoesNotExists } from "../../domain/UCDoesNotExist";
import { UCId } from "../../domain/UCId";
import { UCRepository } from "../../domain/UCRepository";

export class UCFinder {
	constructor(private readonly repository: UCRepository) {}
	async find(id: string): Promise<UC> {
		const uc = await this.repository.search(new UCId(id));
		if (!uc) {
			throw new UCDoesNotExists(id);
		}

		return uc;
	}
}
