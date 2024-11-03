import { Guide } from "../../domain/Guide";
import { GuideId } from "../../domain/GuideId";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuideSearcher {
	constructor(private readonly repository: GuideRepository) {}

	async search(id: string): Promise<Guide | null> {
		return this.repository.search(new GuideId(id));
	}
}
