import { AnnouncementsByCriteriaSearcher } from "../../../../../../src/contexts/cma/announcements/application/search-by-criteria/AnnouncementsByCriteriaSearcher";
import { Criteria } from "../../../../../../src/contexts/shared/domain/criteria/Criteria";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementsByCriteriaSearcher should", () => {
	const repository = new MockAnnouncementRepository();
	const searcher = new AnnouncementsByCriteriaSearcher(repository);

	it("search announcements by criteria", async () => {
		const expectedAnnouncements = [AnnouncementMother.create(), AnnouncementMother.create()];
		const expectedAnnouncementsPrimitives = expectedAnnouncements.map(a => a.toPrimitives());
		const criteria = Criteria.fromPrimitives([], null, null, null, null);
		repository.shouldMatch(expectedAnnouncements);

		const announcements = await searcher.search([], null, null, null, null);

		repository.assertMatchingHaveBeenCalledWith(criteria);
		expect(announcements).toEqual(expectedAnnouncementsPrimitives);
	});
});
