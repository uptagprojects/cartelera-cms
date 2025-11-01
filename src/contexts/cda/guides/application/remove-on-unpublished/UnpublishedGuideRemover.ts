import { Service } from "diod";

import { GuideId } from "../../domain/GuideId";
import { GuideRepository } from "../../domain/GuideRepository";

@Service()
export class UnpublishedGuideRemover {
    constructor(private readonly repository: GuideRepository) {}

    async remove(id: string): Promise<void> {
        const guide = await this.repository.search(new GuideId(id));
        if (guide) {
            await this.repository.remove(guide);
        }
    }
}
