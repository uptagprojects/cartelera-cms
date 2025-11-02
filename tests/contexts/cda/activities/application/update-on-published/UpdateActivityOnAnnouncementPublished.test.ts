import { PublishedActivityUpdater } from "../../../../../../src/contexts/cda/activities/application/update-on-published/PublishedActivityUpdater";
import { UpdateActivityOnAnnouncementPublished } from "../../../../../../src/contexts/cda/activities/application/update-on-published/UpdateActivityOnAnnouncementPublished";
import { AnnouncementPublishedDomainEventMother } from "../../../../cma/announcements/domain/event/AnnouncementPublishedDomainEventMother";
import { MockMarkdownRemover } from "../../../../shared/infrastructure/MockMarkdownRemover";
import { MockActivityRepository } from "../../infrastructure/MockActivityRepository";

describe("UpdateActivityOnAnnouncementPublished should", () => {
	const repository = new MockActivityRepository();
	const mdRemover = new MockMarkdownRemover();
	const updater = new PublishedActivityUpdater(repository, mdRemover);
	const subscriber = new UpdateActivityOnAnnouncementPublished(updater);

	it("update activity when an announcement is published", async () => {
		const event = AnnouncementPublishedDomainEventMother.create();
		const contextWithoutMarkdown = event.content.replace(/[#*_`]/g, "");

		repository.shouldSearch(null);
		mdRemover.shouldRemove(event.content, contextWithoutMarkdown);
		repository.shouldSave();

		await subscriber.on(event);
	});
});
