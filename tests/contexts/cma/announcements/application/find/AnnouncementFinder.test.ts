import { AnnouncementFinder } from "../../../../../../src/contexts/cma/announcements/application/find/AnnouncementFinder";
import { AnnouncementDoesNotExistError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { AnnouncementIdMother } from "../../domain/AnnouncementIdMother";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementFinder should", () => {
	const repository = new MockAnnouncementRepository();
	const announcementFinder = new AnnouncementFinder(repository);

	it("throw an error finding a non existing announcement", async () => {
		const nonExistingAnnouncementId = AnnouncementIdMother.create();

		repository.shouldSearchAndReturnNull(nonExistingAnnouncementId);
		await expect(announcementFinder.find(nonExistingAnnouncementId.value)).rejects.toThrow(
			new AnnouncementDoesNotExistError(nonExistingAnnouncementId.value)
		);
	});

	it("find an existing announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create();

		repository.shouldSearch(expectedAnnouncement);

		const announcement = await announcementFinder.find(expectedAnnouncement.getId());
		expect(announcement).toEqual(expectedAnnouncement.toPrimitives());
	});
});
