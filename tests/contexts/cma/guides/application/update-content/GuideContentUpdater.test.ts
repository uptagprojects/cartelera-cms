import { GuideContentUpdater } from "../../../../../../src/contexts/cma/guides/application/update-content/GuideContentUpdater";
import { Guide } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { GuideContentMother } from "../../domain/GuideContentMother";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuideContentUpdater should", () => {
	const repository = new MockGuideRepository();
	const eventBus = new MockEventBus();
	const guideContentUpdater = new GuideContentUpdater(repository, eventBus);

	it("update guide content", async () => {
		const guide = GuideMother.create();
		const newContent = GuideContentMother.create().value;
		const updatedGuide = Guide.fromPrimitives({
			...guide.toPrimitives()
		});
		updatedGuide.updateContent(newContent);

		repository.shouldSearch(guide);
		repository.shouldSave();
		eventBus.shouldPublish(updatedGuide.pullDomainEvents());

		await guideContentUpdater.update(guide.toPrimitives().id, newContent);
	});
});
