import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Guide } from "./Guide";
import { GuideId } from "./GuideId";

export interface GuideRepository {
	save(guide: Guide): Promise<void>;

	search(id: GuideId): Promise<Guide | null>;

    matching(criteria: Criteria): Promise<Guide[]>;

    searchAll(): Promise<Guide[]>;

    remove(guide: Guide): Promise<void>;
}
