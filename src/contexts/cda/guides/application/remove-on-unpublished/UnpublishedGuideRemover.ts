import { Service } from "diod";
import { GuideRepository } from "../../domain/GuideRepository";
import { GuideId } from "../../domain/GuideId";

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