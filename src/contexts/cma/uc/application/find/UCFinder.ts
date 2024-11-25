import { UCPrimitives } from "../../domain/UC";
import { UCDoesNotExistError } from "../../domain/UCDoesNotExistError";
import { UCId } from "../../domain/UCId";
import { UCRepository } from "../../domain/UCRepository";

export class UCFinder {
	constructor(private readonly repository: UCRepository) {}

	async find(id: string): Promise<UCPrimitives> {
		const uc = await this.repository.search(new UCId(id));
		if (!uc) {
			throw new UCDoesNotExistError(id);
		}

		return uc.toPrimitives();
	}
}
