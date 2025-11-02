import { UserArchiver } from "../../../../../../src/contexts/cma/users/application/archive/UserArchiver";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserArchiver should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userArchiver = new UserArchiver(repository, eventBus);

	it("archive an existing active user", async () => {
		const expectedActiveUser = UserMother.active();
		const expectedActiveUserPrimitives = expectedActiveUser.toPrimitives();

		const expectedArchivedUser = User.fromPrimitives(expectedActiveUserPrimitives);

		expectedArchivedUser.archive();

		repository.shouldSearch(expectedActiveUser);
		repository.shouldSave(expectedArchivedUser);
		eventBus.shouldPublish(expectedArchivedUser.pullDomainEvents());

		await userArchiver.archive(expectedActiveUser.getId());
	});
});
