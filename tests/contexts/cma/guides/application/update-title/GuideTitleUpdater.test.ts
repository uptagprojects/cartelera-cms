import { GuideTitleUpdater } from "../../../../../../src/contexts/cma/guides/application/update-title/GuideTitleUpdater";
import { Guide } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { GuideMother } from "../../domain/GuideMother";
import { GuideTitleMother } from "../../domain/GuideTitleMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuideTitleUpdater should", () => {
	const repository = new MockGuideRepository();
	const eventBus = new MockEventBus();
	const guideTitleUpdater = new GuideTitleUpdater(repository, eventBus);

	it("update guide title", async () => {
		const guide = GuideMother.create();
		const newTitle = GuideTitleMother.create().value;
		const updatedGuide = Guide.fromPrimitives({
			...guide.toPrimitives()
		});
		updatedGuide.updateTitle(newTitle);

		repository.shouldSearch(guide);
		repository.shouldSave();
		eventBus.shouldPublish(updatedGuide.pullDomainEvents());

		await guideTitleUpdater.update(guide.toPrimitives().id, newTitle);
	});
});
