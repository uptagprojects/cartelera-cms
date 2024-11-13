import { Service } from "diod";

import { UCId } from "../../domain/UCId";
import { UCRepository } from "../../domain/UCRepository";

@Service()
export class UnpublishedUCRemover {
	constructor(private readonly repository: UCRepository) {}

	async remove(id: string): Promise<void> {
		const uc = await this.repository.search(new UCId(id));
		if (uc) {
			await this.repository.remove(uc);
		}
	}
}
