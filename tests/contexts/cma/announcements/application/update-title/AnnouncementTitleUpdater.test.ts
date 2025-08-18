import { AnnouncementTitleUpdater } from "../../../../../../src/contexts/cma/announcements/application/update-title/AnnouncementTitleUpdater";
import { AnnouncementIsArchivedError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementIsArchivedError";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementTitleUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementTitleUpdatedDomainEvent";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { AnnouncementTitleMother } from "../../domain/AnnouncementTitleMother";
import { AnnouncementTitleUpdatedDomainEventMother } from "../../domain/event/AnnouncementTitleUpdatedDomainEventMother";

describe("AnnouncementTitleUpdater should", () => {
    const repository = new MockAnnouncementRepository();
    const eventBus = new MockEventBus();
    const updater = new AnnouncementTitleUpdater(repository, eventBus);

    it("update an existing announcement title", async () => {
        const existingAnnouncement = AnnouncementMother.create({
            status: AnnouncementStatus.DRAFT
        });

        const newTitle = AnnouncementTitleMother.create();

        const expectedAnnouncement = AnnouncementMother.create({
            ...existingAnnouncement.toPrimitives(),
            title: newTitle.value
        });

        const expectedDomainEvent = AnnouncementTitleUpdatedDomainEventMother.create(
            expectedAnnouncement.toPrimitives()
        );

        repository.shouldSearch(existingAnnouncement);
        repository.shouldSave(expectedAnnouncement);
        eventBus.shouldPublish([expectedDomainEvent]);

        await updater.update(expectedAnnouncement.getId(), newTitle.value);
    });

    it("throw an error when announcement is archived", async () => {
        const expectedAnnouncement = AnnouncementMother.create({
            status: AnnouncementStatus.ARCHIVED
        });
        const newTitle = AnnouncementTitleMother.create();

        repository.shouldSearch(expectedAnnouncement);

        await expect(updater.update(expectedAnnouncement.getId(), newTitle.value)).rejects.toThrow(
            new AnnouncementIsArchivedError(expectedAnnouncement.getId())
        );
    });
});
