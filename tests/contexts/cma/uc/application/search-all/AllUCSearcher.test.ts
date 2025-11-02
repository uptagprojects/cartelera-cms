import { AllUCSearcher } from "../../../../../../src/contexts/cma/uc/application/search-all/AllUCSearcher";
import { UCMother } from "../../domain/UCMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("AllUCSearcher should", () => {
	const repository = new MockUCRepository();
	const allUCSearcher = new AllUCSearcher(repository);

	it("search all UCs", async () => {
		const expectedUCs = [UCMother.create(), UCMother.create(), UCMother.create()];

		repository.shouldSearchAll(expectedUCs);

		const ucs = await allUCSearcher.searchAll();

		expect(ucs).toEqual(expectedUCs);
	});
});
