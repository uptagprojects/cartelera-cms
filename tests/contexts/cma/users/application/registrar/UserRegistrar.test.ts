import { UserRegistrar } from "../../../../../../src/contexts/cma/users/application/registrar/UserRegistrar";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserRegisteredDomainEventMother } from "../../domain/events/UserRegisteredDomainEventMother";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userRegistrar = new UserRegistrar(repository, eventBus);

	it("register a valid user", async () => {
		const expectedUser = UserMother.create({ status: "pending_confirmation", emailVerified: null });
		const expectedUserPrimitives = expectedUser.toPrimitives();
		const expectedDomainEvent = UserRegisteredDomainEventMother.create(expectedUserPrimitives);

		repository.shouldSave(expectedUser);
		eventBus.shouldPublish([expectedDomainEvent]);

		await userRegistrar.register(
			expectedUserPrimitives.id,
			expectedUserPrimitives.name,
			expectedUserPrimitives.email,
			expectedUserPrimitives.avatar
		);
	});
});
