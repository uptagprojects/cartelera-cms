import { PublishedActivityUpdater } from "../../../../../../src/contexts/cda/activities/application/update-on-published/PublishedActivityUpdater";
import { UpdateActivityOnEventPublished } from "../../../../../../src/contexts/cda/activities/application/update-on-published/UpdateActivityOnEventPublished";
import { EventPublishedDomainEventMother } from "../../../../cma/events/domain/event/EventPublishedDomainEventMother";
import { MockMarkdownRemover } from "../../../../shared/infrastructure/MockMarkdownRemover";
import { MockActivityRepository } from "../../infrastructure/MockActivityRepository";

describe("UpdateActivityOnEventPublished should", () => {
	const repository = new MockActivityRepository();
	const mdRemover = new MockMarkdownRemover();
	const updater = new PublishedActivityUpdater(repository, mdRemover);
	const subscriber = new UpdateActivityOnEventPublished(updater);

	it("update activity when an event is published", async () => {
		const event = EventPublishedDomainEventMother.create();

		repository.shouldSearch(null);
		repository.shouldSave();

		await subscriber.on(event);
	});
});
