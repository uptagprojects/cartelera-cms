import { RemoveOnEventUnpublished } from "../../../../../../src/contexts/cda/events/application/remove-on-unpublished/RemoveOnEventUnpublished";
import { UnpublishedEventRemover } from "../../../../../../src/contexts/cda/events/application/remove-on-unpublished/UnpublishedEventRemover";
import { EventRemovedDomainEventMother } from "../../../../cma/events/domain/event/EventRemovedDomainEventMother";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("RemoveOnEventUnpublished should", () => {
	const repository = new MockEventRepository();
	const subscriber = new RemoveOnEventUnpublished(
		new UnpublishedEventRemover(repository)
	);

	it("remove an event when it is unpublished", async () => {
		const event = EventMother.create();
		const domainEvent = EventRemovedDomainEventMother.create({ id: event.toPrimitives().id });

		repository.shouldSearch(event);
		repository.shouldRemove();

		await subscriber.on(domainEvent);
	});
});
