import { UserEmailFinder } from "../../../../../../src/contexts/cma/users/application/find-by-email/UserEmailFinder";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserEmailFinder should", () => {
	const repository = new MockUserRepository();
	const userEmailFinder = new UserEmailFinder(repository);

	it("find a user by email", async () => {
		const expectedUser = UserMother.create();

		repository.shouldSearchByEmail(expectedUser);

		const user = await userEmailFinder.find(expectedUser.toPrimitives().email);

		expect(user).toEqual(expectedUser.toPrimitives());
	});
});
