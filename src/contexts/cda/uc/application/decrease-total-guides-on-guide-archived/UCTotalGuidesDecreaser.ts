import { Service } from "diod";

import { UCId } from "../../domain/UCId";
import { UCRepository } from "../../domain/UCRepository";

@Service()
export class UCTotalGuidesDecreaser {
	constructor(private readonly repository: UCRepository) {}

	async decrement(ucId: string): Promise<void> {
		const uc = await this.repository.search(new UCId(ucId));

		if (uc) {
			uc.decreaseTotalGuides();
			await this.repository.save(uc);
		}
	}
}
