import { User } from "./User";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export interface UserRepository {
	searchByEmailAndPassword(email: UserEmail, password: UserPassword): Promise<User | null>;

	save(id: UserId, name: UserName, email: UserEmail, password: UserPassword): Promise<void>;
}
