import { User } from "../../../../../src/contexts/cma/users/domain/User";
import { UserEmail } from "../../../../../src/contexts/cma/users/domain/UserEmail";
import { UserId } from "../../../../../src/contexts/cma/users/domain/UserId";
import { UserRepository } from "../../../../../src/contexts/cma/users/domain/UserRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockUserRepository implements UserRepository {
	private mockSave = jest.fn();
	private mockSearch = jest.fn();
	private mockSearchByEmail = jest.fn();
	private mockMatching = jest.fn();

	async save(user: User): Promise<void> {
		this.mockSave(user);
	}

	async search(id: UserId): Promise<User | null> {
		return this.mockSearch(id);
	}

	async searchByEmail(email: UserEmail): Promise<User | null> {
		return this.mockSearchByEmail(email);
	}

	async matching(criteria: Criteria): Promise<User[]> {
		return this.mockMatching(criteria);
	}

	shouldSave(): void {
		this.mockSave = jest.fn();
	}

	shouldSearch(user: User | null): void {
		this.mockSearch.mockReturnValue(Promise.resolve(user));
	}

	shouldSearchByEmail(user: User | null): void {
		this.mockSearchByEmail.mockReturnValue(Promise.resolve(user));
	}

	shouldMatch(users: User[]): void {
		this.mockMatching.mockReturnValue(Promise.resolve(users));
	}

	assertSaveHaveBeenCalledWith(user: User): void {
		expect(this.mockSave).toHaveBeenCalledWith(user);
	}
}
