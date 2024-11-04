import { UC } from "../../domain/UC";
import { UCRepository } from "../../domain/UCRepository";

export class AllUCSearcher {
	constructor(private readonly repository: UCRepository) {}

	async searchAll(): Promise<UC[]> {
		return this.repository.searchAll();
	}
}
