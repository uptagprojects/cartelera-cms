import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { User } from "./User";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export abstract class UserRepository {
    abstract searchByEmail(email: UserEmail): Promise<User | null>;

    abstract search(id: UserId): Promise<User | null>;

    abstract matching(criteria: Criteria): Promise<User[]>;

    abstract save(user: User): Promise<void>;
}
