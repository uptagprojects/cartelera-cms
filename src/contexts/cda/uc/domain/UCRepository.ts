import { UC } from "./UC";
import { UCId } from "./UCId";

export interface UCRepository {
	search(id: UCId): Promise<UC | null>;
}
