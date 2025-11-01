import { UserProviderConfirmer } from "../../../../../../src/contexts/cma/users/application/confirm-from-provider/UserProviderConfirmer";
import { UserMother } from "../../domain/UserMother";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserProviderConfirmer should", () => {
	const repository = new MockUserRepository();
	const userProviderConfirmer = new UserProviderConfirmer(repository);

	it("confirm a user from provider", async () => {
		const user = UserMother.create({ status: UserStatus.PENDING_CONFIRMATION, emailVerified: null });

		repository.shouldSearch(user);
		repository.shouldSave(expect.objectContaining({
			id: user.toPrimitives().id,
			status: UserStatus.ACTIVE,
			emailVerified: expect.any(Date)
		}));

		await userProviderConfirmer.confirm(user.toPrimitives().id);
	});
});
