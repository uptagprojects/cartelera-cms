import { faker } from "@faker-js/faker";
import { AnnouncementFinder } from "../../../../../../src/contexts/cma/announcements/application/find/AnnouncementFinder";
import { AnnouncementDoesNotExistError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { AnnouncementId } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementId";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementFinder should", () => {
	const repository = new MockAnnouncementRepository();
	const finder = new AnnouncementFinder(repository);

	it("find a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create();
		const expectedAnnouncementPrimitives = expectedAnnouncement.toPrimitives();
		repository.shouldSearch(expectedAnnouncement);

		const announcement = await finder.find(expectedAnnouncementPrimitives.id);

		repository.assertSearchHaveBeenCalledWith(new AnnouncementId(expectedAnnouncementPrimitives.id));
		expect(announcement).toEqual(expectedAnnouncementPrimitives);
	});

	it("throw an error when announcement does not exist", async () => {
		const id = faker.string.uuid();
		repository.shouldSearch(null);

		await expect(finder.find(id)).rejects.toThrow(AnnouncementDoesNotExistError);

		repository.assertSearchHaveBeenCalledWith(new AnnouncementId(id));
	});
});
