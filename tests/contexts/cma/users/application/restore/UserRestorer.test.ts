import { UserRestorer } from "../../../../../../src/contexts/cma/users/application/restore/UserRestorer";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserRestorer should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userRestorer = new UserRestorer(repository, eventBus);

	it("restore an archived user", async () => {
		const user = UserMother.create({ status: UserStatus.ARCHIVED });
		const restoredUser = User.fromPrimitives({
			...user.toPrimitives()
		});
		restoredUser.restore();

		repository.shouldSearch(user);
		repository.shouldSave(user);
		eventBus.shouldPublish(restoredUser.pullDomainEvents());

		await userRestorer.restore(user.getId());
	});
});
