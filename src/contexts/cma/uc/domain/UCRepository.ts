import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { UC } from "./UC";
import { UCId } from "./UCId";

export interface UCRepository {
    save(uc: UC): Promise<void>;
    search(id: UCId): Promise<UC | null>;
    searchAll(): Promise<UC[]>;
    remove(uc: UC): Promise<void>;
}