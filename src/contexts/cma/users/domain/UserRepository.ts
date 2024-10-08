import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";

export interface UserRepository {
	
	searchByEmailAndPassword(email: UserEmail, password: UserPassword): Promise<User | null>;

}