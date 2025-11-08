import { RemoveOnGuideUnpublished } from "../../../../../../src/contexts/cda/guides/application/remove-on-unpublished/RemoveOnGuideUnpublished";
import { UnpublishedGuideRemover } from "../../../../../../src/contexts/cda/guides/application/remove-on-unpublished/UnpublishedGuideRemover";
import { GuideArchivedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideArchivedDomainEvent";
import { GuideRemovedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideRemovedDomainEvent";
import { GuideRestoredDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideRestoredDomainEvent";
import { GuideArchivedDomainEventMother } from "../../domain/event/GuideArchivedDomainEventMother";
import { GuideRemovedDomainEventMother } from "../../domain/event/GuideRemovedDomainEventMother";
import { GuideRestoredDomainEventMother } from "../../domain/event/GuideRestoredDomainEventMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("RemoveOnGuideUnpublished should", () => {
	const repository = new MockGuideRepository();
	const remover = new UnpublishedGuideRemover(repository);
	const subscriber = new RemoveOnGuideUnpublished(remover);

	it("be subscribed to GuideArchivedDomainEvent, GuideRemovedDomainEvent and GuideRestoredDomainEvent", () => {
		const subscribedTo = subscriber.subscribedTo();

		expect(subscribedTo).toContain(GuideArchivedDomainEvent);
		expect(subscribedTo).toContain(GuideRemovedDomainEvent);
		expect(subscribedTo).toContain(GuideRestoredDomainEvent);
	});

	it("have the correct name", () => {
		expect(subscriber.name()).toBe("pnfi.cda.remove_guide_on_unpublished");
	});

	it("remove guide when GuideArchivedDomainEvent is triggered", async () => {
		const event = GuideArchivedDomainEventMother.create();

		repository.shouldSearch(null);

		await subscriber.on(event);
	});

	it("remove guide when GuideRemovedDomainEvent is triggered", async () => {
		const event = GuideRemovedDomainEventMother.create();

		repository.shouldSearch(null);

		await subscriber.on(event);
	});

	it("remove guide when GuideRestoredDomainEvent is triggered", async () => {
		const event = GuideRestoredDomainEventMother.create();

		repository.shouldSearch(null);

		await subscriber.on(event);
	});
});
