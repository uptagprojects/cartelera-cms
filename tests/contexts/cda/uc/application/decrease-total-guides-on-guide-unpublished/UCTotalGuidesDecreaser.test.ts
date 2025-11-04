import { UCTotalGuidesDecreaser } from "../../../../../../src/contexts/cda/uc/application/decrease-total-guides-on-guide-unpublished/UCTotalGuidesDecreaser";
import { UCMother } from "../../domain/UCMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UCTotalGuidesDecreaser should", () => {
	const repository = new MockUCRepository();
	const decreaser = new UCTotalGuidesDecreaser(repository);

	it("decrement total guides for an existing UC", async () => {
		const uc = UCMother.create({ totalGuides: 10 });
		const ucId = uc.toPrimitives().id;

		repository.shouldSearch(uc);
		repository.shouldSave();

		await decreaser.decrement(ucId);

		expect(uc.toPrimitives().totalGuides).toBe(9);
	});

	it("do nothing when UC does not exist", async () => {
		const ucId = "550e8400-e29b-41d4-a716-446655440000";

		repository.shouldSearch(null);

		await decreaser.decrement(ucId);
	});
});
