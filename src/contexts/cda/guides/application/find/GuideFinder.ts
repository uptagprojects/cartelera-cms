import { Guide } from "../../domain/Guide";
import { GuideDoesNotExists } from "../../domain/GuideDoesNotExists";
import { GuideId } from "../../domain/GuideId";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuideFinder {
    constructor(private readonly repository: GuideRepository) {}
    async find(id: string): Promise<Guide> {
        const guide = await this.repository.search(new GuideId(id));
        if (!guide) {
            throw new GuideDoesNotExists(id);
        }

        return guide;
    }
}
