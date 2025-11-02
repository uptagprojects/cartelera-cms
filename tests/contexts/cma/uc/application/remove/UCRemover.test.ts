import { UCRemover } from "../../../../../../src/contexts/cma/uc/application/remove/UCRemover";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UCMother } from "../../domain/UCMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UCRemover should", () => {
	const repository = new MockUCRepository();
	const eventBus = new MockEventBus();
	const ucRemover = new UCRemover(repository, eventBus);

	it("remove an existing UC", async () => {
		const uc = UCMother.create();

		repository.shouldSearch(uc);
		repository.shouldRemove();
		eventBus.shouldPublish([]);

		await ucRemover.remove(uc.getId().value);
	});
});
