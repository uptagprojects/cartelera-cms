import { faker } from "@faker-js/faker";
import { AnnouncementFinder } from "../../../../../../src/contexts/cma/announcements/application/find/AnnouncementFinder";
import { AnnouncementDoesNotExistError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { AnnouncementId } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementId";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { AnnouncementIdMother } from "../../domain/AnnouncementIdMother";

describe("AnnouncementFinder should", () => {
	const repository = new MockAnnouncementRepository();
	const finder = new AnnouncementFinder(repository);

	it("find a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create();
		const expectedAnnouncementPrimitives = expectedAnnouncement.toPrimitives();

		repository.shouldSearch(expectedAnnouncement);

		expect(await finder.find(expectedAnnouncementPrimitives.id)).toEqual(expectedAnnouncementPrimitives)
	});

	it("throw an error when announcement does not exist", async () => {
		const nonExistingAnnouncementId = AnnouncementIdMother.create();
		repository.shouldSearchAndReturnNull(nonExistingAnnouncementId);

		await expect(
			finder.find(nonExistingAnnouncementId.value)
		).rejects.toThrow(
			new AnnouncementDoesNotExistError(nonExistingAnnouncementId.value)
		);
	});
});
