import { UC } from "../../domain/UC";
import { UCFinder as DomainUCFinder } from "../../domain/UCFinder";
import { UCRepository } from "../../domain/UCRepository";

export class UCFinder {
	private readonly finder: DomainUCFinder;

	constructor(repository: UCRepository) {
		this.finder = new DomainUCFinder(repository);
	}

	async find(id: string): Promise<UC> {
		return this.finder.find(id);
	}
}
