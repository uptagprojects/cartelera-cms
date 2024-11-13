import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Activity } from "./Activity";
import { ActivityId } from "./ActivityId";

export abstract class ActivityRepository {
	abstract matching(criteria: Criteria): Promise<Activity[]>;
	abstract search(id: ActivityId): Promise<Activity | null>;
	abstract save(activity: Activity): Promise<void>;
}
