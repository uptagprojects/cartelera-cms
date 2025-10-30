import { UserAvatarUpdater } from "../../../../../../src/contexts/cma/users/application/update-avatar/UserAvatarUpdater";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { UserAvatarMother } from "../../domain/UserAvatarMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { User } from "../../../../../../src/contexts/cma/users/domain/User";

describe("UserAvatarUpdater should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userAvatarUpdater = new UserAvatarUpdater(repository, eventBus);

	it("update user avatar", async () => {
		const user = UserMother.create();
		const newAvatar = UserAvatarMother.create().value.toString();
		const updatedUser = User.fromPrimitives({
			...user.toPrimitives()
		});
		updatedUser.updateAvatar(newAvatar);

		repository.shouldSearch(user);
		repository.shouldSave(user);
		eventBus.shouldPublish(updatedUser.pullDomainEvents());

		await userAvatarUpdater.update(user.getId(), newAvatar);
	});
});
