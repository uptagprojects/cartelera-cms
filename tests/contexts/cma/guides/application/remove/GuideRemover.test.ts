import { GuideRemover } from "../../../../../../src/contexts/cma/guides/application/remove/GuideRemover";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuideRemover should", () => {
	const repository = new MockGuideRepository();
	const eventBus = new MockEventBus();
	const guideRemover = new GuideRemover(repository, eventBus);

	it("remove an existing guide", async () => {
		const guide = GuideMother.create();

		repository.shouldSearch(guide);
		repository.shouldRemove();
		eventBus.shouldPublish([]);

		await guideRemover.remove(guide.toPrimitives().id);
	});
});
