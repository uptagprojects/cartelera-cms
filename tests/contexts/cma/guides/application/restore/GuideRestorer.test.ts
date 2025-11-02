import { GuideRestorer } from "../../../../../../src/contexts/cma/guides/application/restore/GuideRestorer";
import { Guide } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuideRestorer should", () => {
	const repository = new MockGuideRepository();
	const eventBus = new MockEventBus();
	const guideRestorer = new GuideRestorer(repository, eventBus);

	it("restore an existing guide", async () => {
		const guide = GuideMother.create();
		const restoredGuide = Guide.fromPrimitives({
			...guide.toPrimitives()
		});
		restoredGuide.restore();

		repository.shouldSearch(guide);
		repository.shouldSave();
		eventBus.shouldPublish(restoredGuide.pullDomainEvents());

		await guideRestorer.restore(guide.toPrimitives().id);
	});
});
