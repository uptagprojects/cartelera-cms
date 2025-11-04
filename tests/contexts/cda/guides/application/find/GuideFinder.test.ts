import { GuideFinder } from "../../../../../../src/contexts/cda/guides/application/find/GuideFinder";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuideFinder should", () => {
	const repository = new MockGuideRepository();
	const guideFinder = new GuideFinder(repository);

	it("find an existing guide", async () => {
		const expectedGuide = GuideMother.create();

		repository.shouldSearch(expectedGuide);

		const guide = await guideFinder.find(expectedGuide.toPrimitives().id);

		expect(guide).toEqual(expectedGuide);
	});
});
