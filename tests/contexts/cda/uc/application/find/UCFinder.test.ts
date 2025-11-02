import { UCFinder } from "../../../../../../src/contexts/cda/uc/application/find/UCFinder";
import { UCMother } from "../../domain/UCMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UCFinder should", () => {
	const repository = new MockUCRepository();
	const ucFinder = new UCFinder(repository);

	it("find an existing UC", async () => {
		const expectedUC = UCMother.create();

		repository.shouldSearch(expectedUC);

		const uc = await ucFinder.find(expectedUC.toPrimitives().id);

		expect(uc).toEqual(expectedUC);
	});
});
