import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { User } from "./User";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserPassword } from "./UserPassword";

export interface UserRepository {
	searchByEmailAndPassword(email: UserEmail, password: UserPassword): Promise<User | null>;

	search(id: UserId): Promise<User | null>;

	matching(criteria: Criteria): Promise<User[]>;

	save(user: User, password: UserPassword): Promise<void>;
}
