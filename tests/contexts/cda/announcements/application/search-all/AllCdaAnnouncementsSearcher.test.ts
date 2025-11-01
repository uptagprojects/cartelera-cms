import { AllCdaAnnouncementsSearcher } from "../../../../../../src/contexts/cda/announcements/application/search-all/AllCdaAnnouncementsSearcher";
import { CdaAnnouncementMother } from "../../domain/CdaAnnouncementMother";
import { MockCdaAnnouncementRepository } from "../../infrastructure/MockCdaAnnouncementRepository";

describe("AllCdaAnnouncementsSearcher should", () => {
	const repository = new MockCdaAnnouncementRepository();
	const searcher = new AllCdaAnnouncementsSearcher(repository);

	it("search all announcements and return primitives", async () => {
		const announcement1 = CdaAnnouncementMother.create();
		const announcement2 = CdaAnnouncementMother.create();
		const announcements = [announcement1, announcement2];

		repository.shouldSearchAll(announcements);

		const result = await searcher.searchAll();

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual(announcement1.toPrimitives());
		expect(result[1]).toEqual(announcement2.toPrimitives());
	});

	it("return empty array when no announcements exist", async () => {
		repository.shouldSearchAll([]);

		const result = await searcher.searchAll();

		expect(result).toHaveLength(0);
		expect(result).toEqual([]);
	});
});
