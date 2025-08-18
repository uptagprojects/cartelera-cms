import { UserRegistrar } from "../../../../../../src/contexts/cma/users/application/registrar/UserRegistrar";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { UserRegisteredDomainEventMother } from "../../domain/event/UserRegisteredDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar should", () => {
	const repository = new MockUserRepository();
	const eventBus = new MockEventBus();
	const userRegistrar = new UserRegistrar(repository, eventBus);

	it("register a valid user", async () => {
		const expectedUser = UserMother.create({
			emailVerified: null,
			status: UserStatus.PENDING_CONFIRMATION
		});
		const expectedPresenter = UserMother.create();
		const expectedUserPrimitives = expectedUser.toPrimitives();
		const expectedPresenterPrimitives = expectedPresenter.toPrimitives();
		const expectedDomainEvent = UserRegisteredDomainEventMother.create(expectedUserPrimitives, expectedPresenterPrimitives);

		repository.shouldSearch(expectedPresenter);
		repository.shouldSave(expectedUser);
		eventBus.shouldPublish([expectedDomainEvent]);

		await userRegistrar.register(
			expectedUserPrimitives.id,
			expectedUserPrimitives.name,
			expectedUserPrimitives.email,
			expectedUserPrimitives.avatar,
			expectedPresenterPrimitives.id
		);
		
	});
});
