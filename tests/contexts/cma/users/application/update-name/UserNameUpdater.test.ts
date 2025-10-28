import { UserNameUpdater } from "../../../../../../src/contexts/cma/users/application/update-name/UserNameUpdater";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { UserNameMother } from "../../domain/UserNameMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserNameUpdater should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userNameUpdater = new UserNameUpdater(repository, eventBus);

	it("update user name", async () => {
		const user = UserMother.create();
		const newName = UserNameMother.create().value;
		const updatedUser = User.fromPrimitives({
			...user.toPrimitives()
		});
		updatedUser.updateName(newName);

		repository.shouldSearch(user);
		repository.shouldSave(user);
		eventBus.shouldPublish(updatedUser.pullDomainEvents());

		await userNameUpdater.update(user.getId(), newName);
	});
});
