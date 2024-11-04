import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { UC } from "./UC";
import { UCId } from "./UCId";

export abstract class UCRepository {
	abstract save(uc: UC): Promise<void>;
	
	abstract search(id: UCId): Promise<UC | null>;

	abstract searchAll(): Promise<UC[]>;

	abstract matching(criteria: Criteria): Promise<UC[]>;

	abstract remove(uc: UC): Promise<void>;
}
