import { User } from "../../../../../src/contexts/cma/users/domain/User";
import { UserEmail } from "../../../../../src/contexts/cma/users/domain/UserEmail";
import { UserId } from "../../../../../src/contexts/cma/users/domain/UserId";
import { UserRepository } from "../../../../../src/contexts/cma/users/domain/UserRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockUserRepository implements UserRepository {
	private readonly mockSearchByEmail = jest.fn();
	private readonly mockSearch = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockSave = jest.fn();

	async save(user: User): Promise<void> {
		expect(this.mockSave).toHaveBeenCalledWith(user.toPrimitives());
	}

	async searchByEmail(email: UserEmail): Promise<User | null> {
		expect(this.mockSearchByEmail).toHaveBeenCalledWith(email);

		return this.mockSearchByEmail() as Promise<User | null>;
	}

	async search(id: UserId): Promise<User | null> {
		expect(this.mockSearch).toHaveBeenCalledWith(id);

		return this.mockSearch() as Promise<User | null>;
	}

	async matching(criteria: Criteria): Promise<User[]> {
		expect(this.mockMatching).toHaveBeenCalledWith(criteria);

		return this.mockMatching() as Promise<User[]>;
	}

	shouldSearchByEmail(user: User): void {
		const { email } = user.toPrimitives();
		this.mockSearchByEmail(email);
		this.mockSearchByEmail.mockReturnValueOnce(user);
	}

	shouldSearch(user: User): void {
		this.mockSearch(new UserId(user.getId()));
		this.mockSearch.mockReturnValueOnce(user);
	}

	shouldMatch(criteria: Criteria, users: User[]): void {
		this.mockMatching(criteria);
		this.mockMatching.mockReturnValueOnce(users);
	}

	shouldSave(user: User): void {
		this.mockSave(user.toPrimitives());
	}
}
