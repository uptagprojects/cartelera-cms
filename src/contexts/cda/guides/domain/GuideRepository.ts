import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Guide } from "./Guide";
import { GuideId } from "./GuideId";

export abstract class GuideRepository {
	abstract save(guide: Guide): Promise<void>;
	abstract search(id: GuideId): Promise<Guide | null>;
	abstract matching(criteria: Criteria): Promise<Guide[]>;
	abstract remove(guide: Guide): Promise<void>;
}
