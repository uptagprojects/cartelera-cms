import { UCTotalGuidesIncreaser } from "../../../../../../src/contexts/cda/uc/application/increase-total-guides-on-guide-published/UCTotalGuidesIncreaser";
import { UCMother } from "../../domain/UCMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UCTotalGuidesIncreaser should", () => {
	const repository = new MockUCRepository();
	const increaser = new UCTotalGuidesIncreaser(repository);

	it("increment total guides for an existing UC", async () => {
		const uc = UCMother.create({ totalGuides: 5 });
		const ucId = uc.toPrimitives().id;

		repository.shouldSearch(uc);
		repository.shouldSave();

		await increaser.increment(ucId);

		expect(uc.toPrimitives().totalGuides).toBe(6);
	});

	it("do nothing when UC does not exist", async () => {
		const ucId = "550e8400-e29b-41d4-a716-446655440000";

		repository.shouldSearch(null);

		await increaser.increment(ucId);
	});
});
