import { Guide } from "./Guide";
import { GuideDoesNotExist } from "./GuideDoesNotExist";
import { GuideId } from "./GuideId";
import { GuideRepository } from "./GuideRepository";

export class GuideFinder {
    constructor(private readonly repository: GuideRepository) {}

    async find(id: string): Promise<Guide> {
        const guide = await this.repository.search(new GuideId(id));
        if(!guide) {
            throw new GuideDoesNotExist(id);
        }

        return guide;
    }
}