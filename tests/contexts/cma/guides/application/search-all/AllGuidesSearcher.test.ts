import { AllGuidesSearcher } from "../../../../../../src/contexts/cma/guides/application/search-all/AllGuidesSearcher";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("AllGuidesSearcher should", () => {
	const repository = new MockGuideRepository();
	const allGuidesSearcher = new AllGuidesSearcher(repository);

	it("search all guides", async () => {
		const expectedGuides = [GuideMother.create(), GuideMother.create()];

		repository.shouldSearchAll(expectedGuides);

		const guides = await allGuidesSearcher.searchAll();

		expect(guides).toHaveLength(2);
	});
});
