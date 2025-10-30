import { AnnouncementsByCriteriaSearcher } from "../../../../../../src/contexts/cma/announcements/application/search-by-criteria/AnnouncementsByCriteriaSearcher";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementsByCriteriaSearcher should", () => {
	const repository = new MockAnnouncementRepository();
	const announcementsSearcher = new AnnouncementsByCriteriaSearcher(repository);

	it("search announcements by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedAnnouncements = [
			AnnouncementMother.create(),
			AnnouncementMother.create()
		];

		repository.shouldMatch(criteria, expectedAnnouncements);

		const announcements = await announcementsSearcher.search(
			[],
			null,
			null,
			null,
			null
		);

		expect(announcements).toHaveLength(2);
	});
});
