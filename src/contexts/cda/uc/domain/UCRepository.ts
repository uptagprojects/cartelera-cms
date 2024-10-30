import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { UC } from './UC';
import { UCId } from "./UCId";

export interface UCRepository {

	search(id: UCId): Promise<UC | null>;

	matching(criteria : Criteria): Promise<UC[]>;
	
}
