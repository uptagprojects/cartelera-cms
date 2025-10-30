import { UserProviderConfirmer } from "../../../../../../src/contexts/cma/users/application/confirm-from-provider/UserProviderConfirmer";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserProviderConfirmer should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userProviderConfirmer = new UserProviderConfirmer(repository, eventBus);

	it("confirm a user from provider", async () => {
		const user = UserMother.create({ status: UserStatus.PENDING_CONFIRMATION });
		const confirmedUser = User.fromPrimitives({
			...user.toPrimitives()
		});
		confirmedUser.confirmFromProvider();

		repository.shouldSearchByEmail(user);
		repository.shouldSave(user);
		eventBus.shouldPublish(confirmedUser.pullDomainEvents());

		await userProviderConfirmer.confirm(user.toPrimitives().email);
	});
});
