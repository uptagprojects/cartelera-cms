import { AnnouncementRemover } from "../../../../../../src/contexts/cma/announcements/application/remove/AnnouncementRemover";
import { AnnouncementRemovedDomainEventMother } from "../../domain/event/AnnouncementRemovedDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementRemover should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const remover = new AnnouncementRemover(repository, eventBus);

	it("remove a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create();
		const expectedDomainEvent = AnnouncementRemovedDomainEventMother.create(expectedAnnouncement);
		repository.shouldSearch(expectedAnnouncement);
		repository.shouldRemove();
		eventBus.shouldPublish([expectedDomainEvent]);

		await remover.remove(expectedAnnouncement.toPrimitives().id);

		repository.assertRemoveHaveBeenCalledWith(expectedAnnouncement);
	});
});
