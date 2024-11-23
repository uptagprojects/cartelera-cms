import { UC } from "./UC";
import { UCDoesNotExistError } from "./UCDoesNotExistError";
import { UCId } from "./UCId";
import { UCRepository } from "./UCRepository";

export class DomainUCFinder {
	constructor(private readonly repository: UCRepository) {}

	async find(id: string): Promise<UC> {
		const uc = await this.repository.search(new UCId(id));
		if (!uc) {
			throw new UCDoesNotExistError(id);
		}

		return uc;
	}
}
