import { GuidesByCriteriaSearcher } from "../../../../../../src/contexts/cma/guides/application/search-by-criteria/GuidesByCriteriaSearcher";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuidesByCriteriaSearcher should", () => {
	const repository = new MockGuideRepository();
	const guidesSearcher = new GuidesByCriteriaSearcher(repository);

	it("search guides by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedGuides = [GuideMother.create(), GuideMother.create()];

		repository.shouldMatch(criteria, expectedGuides);

		const guides = await guidesSearcher.search([], null, null, null, null);

		expect(guides).toHaveLength(2);
	});
});
