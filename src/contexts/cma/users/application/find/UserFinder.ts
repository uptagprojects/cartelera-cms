import { User } from "../../domain/User";
import { UserFinder as DomainUserFinder } from "../../domain/UserFinder";
import { UserRepository } from "../../domain/UserRepository";

export class UserFinder {
    constructor(private readonly repository: UserRepository) {}

    async find(id: string): Promise<User> {
        const finder = new DomainUserFinder(this.repository);
        return finder.find(id);
    }
}