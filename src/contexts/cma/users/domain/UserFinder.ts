import { Service } from "diod";

import { User } from "./User";
import { UserDoesNotExistError } from "./UserDoesNotExistError";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserRepository } from "./UserRepository";

@Service()
export class UserFinder {
    constructor(private readonly repository: UserRepository) {}

    async find(id: string): Promise<User> {
        const user = await this.repository.search(new UserId(id));
        if (!user) {
            throw new UserDoesNotExistError(id);
        }

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.searchByEmail(new UserEmail(email));
        if (!user) {
            throw new UserDoesNotExistError(email);
        }

        return user;
    }
}
