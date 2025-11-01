import { UserArchiver } from "../../../../../../src/contexts/cma/users/application/archive/UserArchiver";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserArchiver should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userArchiver = new UserArchiver(repository, eventBus);

	it("archive an existing user", async () => {
		const user = UserMother.create();
		const archivedUser = User.fromPrimitives({
			...user.toPrimitives()
		});
		archivedUser.archive();

		repository.shouldSearch(user);
		repository.shouldSave(archivedUser);
		eventBus.shouldPublish(archivedUser.pullDomainEvents());

		await userArchiver.archive(user.getId());
	});
});
