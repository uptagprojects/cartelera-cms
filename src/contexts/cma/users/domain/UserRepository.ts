import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { User } from "./User";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export interface UserRepository {
	searchByEmail(email: UserEmail): Promise<User | null>;

	search(id: UserId): Promise<User | null>;

	matching(criteria: Criteria): Promise<User[]>;

	save(user: User): Promise<void>;
}
