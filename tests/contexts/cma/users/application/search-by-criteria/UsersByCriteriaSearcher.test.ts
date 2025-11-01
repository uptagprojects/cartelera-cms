import { UsersByCriteriaSearcher } from "../../../../../../src/contexts/cma/users/application/search-by-criteria/UsersByCriteriaSearcher";
import { UserMother } from "../../domain/UserMother";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UsersByCriteriaSearcher should", () => {
	const repository = new MockUserRepository();
	const usersSearcher = new UsersByCriteriaSearcher(repository);

	it("search users by criteria", async () => {
		const criteria = CriteriaMother.empty();
		const expectedUsers = [
			UserMother.create(),
			UserMother.create()
		];

		repository.shouldMatch(criteria, expectedUsers);

		const users = await usersSearcher.search(
			[],
			null,
			null,
			null,
			null
		);

		expect(users).toHaveLength(2);
	});
});
