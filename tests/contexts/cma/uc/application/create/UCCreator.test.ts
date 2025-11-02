import { UCCreator } from "../../../../../../src/contexts/cma/uc/application/create/UCCreator";
import { UC } from "../../../../../../src/contexts/cma/uc/domain/UC";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UCIdMother } from "../../domain/UCIdMother";
import { UCNameMother } from "../../domain/UCNameMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UCCreator should", () => {
	const repository = new MockUCRepository();
	const eventBus = new MockEventBus();
	const ucCreator = new UCCreator(repository, eventBus);

	it("create a valid UC", async () => {
		const id = UCIdMother.create().value;
		const name = UCNameMother.create().value;

		// Create a dummy UC to get the event with the right structure
		const dummyUC = UC.create(id, name);
		const expectedEvent = dummyUC.pullDomainEvents()[0];

		repository.shouldSave();
		eventBus.shouldPublish([expectedEvent]);

		await ucCreator.create(id, name);
	});
});
