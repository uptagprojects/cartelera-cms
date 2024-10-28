import { Guide } from "../../domain/Guide";
import { GuideRepository } from "../../domain/GuideRepository";
import { GuideFinder as DomainGuideFinder } from "../../domain/GuideFinder";

export class GuideFinder {
    constructor(private readonly repository: GuideRepository) {}

    async find(id: string): Promise<Guide> {
        const finder = new DomainGuideFinder(this.repository);

        return finder.find(id);
    }
}