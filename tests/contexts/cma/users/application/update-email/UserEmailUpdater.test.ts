import { UserEmailUpdater } from "../../../../../../src/contexts/cma/users/application/update-email/UserEmailUpdater";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { UserEmailMother } from "../../domain/UserEmailMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserEmailUpdater should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userEmailUpdater = new UserEmailUpdater(repository, eventBus);

	it("update user email", async () => {
		const user = UserMother.create();
		const newEmail = UserEmailMother.create().value;
		const updatedUser = User.fromPrimitives({
			...user.toPrimitives()
		});
		updatedUser.updateEmail(newEmail);

		repository.shouldSearch(user);
		repository.shouldSave(user);
		eventBus.shouldPublish(updatedUser.pullDomainEvents());

		await userEmailUpdater.update(user.getId(), newEmail);
	});
});
