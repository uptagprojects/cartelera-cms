import { UC } from "../../domain/UC";
import { UCId } from "../../domain/UCId";
import { UCRepository } from "../../domain/UCRepository";

export class CourseSearcher {
	constructor(private readonly repository: UCRepository) {}

	async search(id: string): Promise<UC | null> {
		return this.repository.search(new UCId(id));
	}
}
