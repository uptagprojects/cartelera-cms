import { UC } from "../../domain/UC";
import { UCFinder as DomainUCFinder } from "../../domain/UCFinder";
import { UCRepository } from "../../domain/UCRepository";

export class UCFinder {
    constructor(private readonly repository: UCRepository) {}

    async find(id: string): Promise<UC> {
        const finder = new DomainUCFinder(this.repository);

        return finder.find(id);
    }
}
