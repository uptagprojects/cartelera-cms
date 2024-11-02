import { Guide } from "../../domain/Guide";
import { GuideRepository } from "../../domain/GuideRepository";

export class AllGuidesSearcher {
    constructor(
        private readonly repository: GuideRepository
    ) {}

    async searchAll(): Promise<Guide[]> {
        return this.repository.searchAll();
    }
}