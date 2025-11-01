import { UserFinder } from "../../../../../../src/contexts/cma/users/application/find/UserFinder";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserFinder should", () => {
	const repository = new MockUserRepository();
	const userFinder = new UserFinder(repository);

	it("find an existing user", async () => {
		const expectedUser = UserMother.create();

		repository.shouldSearch(expectedUser);

		const user = await userFinder.find(expectedUser.getId());

		expect(user?.toPrimitives()).toEqual(expectedUser.toPrimitives());
	});
});
