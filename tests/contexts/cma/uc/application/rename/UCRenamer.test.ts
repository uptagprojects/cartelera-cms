import { UCRenamer } from "../../../../../../src/contexts/cma/uc/application/rename/UCRenamer";
import { UC } from "../../../../../../src/contexts/cma/uc/domain/UC";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UCMother } from "../../domain/UCMother";
import { UCNameMother } from "../../domain/UCNameMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UCRenamer should", () => {
	const repository = new MockUCRepository();
	const eventBus = new MockEventBus();
	const ucRenamer = new UCRenamer(repository, eventBus);

	it("rename an existing UC", async () => {
		const uc = UCMother.create();
		const newName = UCNameMother.create().value;

		// Create a dummy UC to get the event with the right structure
		const dummyUC = UC.fromPrimitives(uc.toPrimitives());
		dummyUC.rename(newName);
		const expectedEvent = dummyUC.pullDomainEvents()[0];

		repository.shouldSearch(uc);
		repository.shouldSave();
		eventBus.shouldPublish([expectedEvent]);

		await ucRenamer.rename(uc.getId().value, newName);
	});
});
