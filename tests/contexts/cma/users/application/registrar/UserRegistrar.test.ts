import { UserRegistrar } from "../../../../../../src/contexts/cma/users/application/registrar/UserRegistrar";
import { UserRegisteredDomainEvent } from "../../../../../../src/contexts/cma/users/domain/event/UserRegisteredDomainEvent";
import { UserRegisteredDomainEventMother } from "../../domain/event/UserRegisteredDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userRegistrar = new UserRegistrar(repository, eventBus);

	it("register a valid user", async () => {
		const expectedUser = UserMother.create();
		const expectedUserPrimitives = expectedUser.toPrimitives();
		repository.shouldSave();

		await userRegistrar.register(
			expectedUserPrimitives.id,
			expectedUserPrimitives.name,
			expectedUserPrimitives.email,
			expectedUserPrimitives.avatar
		);

		eventBus.assertLastPublishedEventIs(UserRegisteredDomainEvent);
	});
});
