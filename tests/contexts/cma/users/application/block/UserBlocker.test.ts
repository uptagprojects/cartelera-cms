import { UserBlocker } from "../../../../../../src/contexts/cma/users/application/block/UserBlocker";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserBlocker should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userBlocker = new UserBlocker(repository, eventBus);

	it("block an existing user", async () => {
		const user = UserMother.create();
		const blockedUser = User.fromPrimitives({
			...user.toPrimitives()
		});
		blockedUser.block();

		repository.shouldSearch(user);
		repository.shouldSave(blockedUser);
		eventBus.shouldPublish(blockedUser.pullDomainEvents());

		await userBlocker.block(user.getId());
	});
});
