import { PublishedActivityUpdater } from "../../../../../../src/contexts/cda/activities/application/update-on-published/PublishedActivityUpdater";
import { UpdateActivityOnGuidePublished } from "../../../../../../src/contexts/cda/activities/application/update-on-published/UpdateActivityOnGuidePublished";
import { GuidePublishedDomainEventMother } from "../../../../cma/guides/domain/events/GuidePublishedDomainEventMother";
import { MockMarkdownRemover } from "../../../../shared/infrastructure/MockMarkdownRemover";
import { MockActivityRepository } from "../../infrastructure/MockActivityRepository";

describe("UpdateActivityOnGuidePublished should", () => {
	const repository = new MockActivityRepository();
	const mdRemover = new MockMarkdownRemover();
	const updater = new PublishedActivityUpdater(repository, mdRemover);
	const subscriber = new UpdateActivityOnGuidePublished(updater);

	it("update activity when a guide is published", async () => {
		const event = GuidePublishedDomainEventMother.create();
		const contextWithoutMarkdown = event.content.replace(/[#*_`]/g, "");

		repository.shouldSearch(null);
		mdRemover.shouldRemove(event.content, contextWithoutMarkdown);
		repository.shouldSave();

		await subscriber.on(event);
	});
});
