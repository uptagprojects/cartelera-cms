import { GuideArchiver } from "../../../../../../src/contexts/cma/guides/application/archive/GuideArchiver";
import { Guide } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuideArchiver should", () => {
	const repository = new MockGuideRepository();
	const eventBus = new MockEventBus();
	const guideArchiver = new GuideArchiver(repository, eventBus);

	it("archive an existing guide", async () => {
		const guide = GuideMother.create();
		const archivedGuide = Guide.fromPrimitives({
			...guide.toPrimitives()
		});
		archivedGuide.archive();

		repository.shouldSearch(guide);
		repository.shouldSave();
		eventBus.shouldPublish(archivedGuide.pullDomainEvents());

		await guideArchiver.archive(guide.toPrimitives().id);
	});
});
