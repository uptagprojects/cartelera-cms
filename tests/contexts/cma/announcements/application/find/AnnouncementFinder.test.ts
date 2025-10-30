import { AnnouncementFinder } from "../../../../../../src/contexts/cma/announcements/application/find/AnnouncementFinder";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementFinder should", () => {
	const repository = new MockAnnouncementRepository();
	const announcementFinder = new AnnouncementFinder(repository);

	it("find an existing announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create();

		repository.shouldSearch(expectedAnnouncement);

		const announcement = await announcementFinder.find(expectedAnnouncement.getId());

		expect(announcement).toEqual(expectedAnnouncement.toPrimitives());
	});
});
