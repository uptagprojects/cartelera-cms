import { Service } from "diod";

import { UCId } from "../../domain/UCId";
import { UCRepository } from "../../domain/UCRepository";

@Service()
export class UCTotalGuidesIncreaser {
    constructor(private readonly repository: UCRepository) {}

    async increment(ucId: string): Promise<void> {
        const uc = await this.repository.search(new UCId(ucId));

        if (uc) {
            uc.increaseTotalGuides();
            await this.repository.save(uc);
        }
    }
}
