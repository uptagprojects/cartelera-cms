import { GuidePublisher } from "../../../../../../src/contexts/cma/guides/application/publish/GuidePublisher";
import { Guide } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuidePublisher should", () => {
	const repository = new MockGuideRepository();
	const eventBus = new MockEventBus();
	const guidePublisher = new GuidePublisher(repository, eventBus);

	it("publish an existing guide", async () => {
		const guide = GuideMother.create();
		const publishedGuide = Guide.fromPrimitives({
			...guide.toPrimitives()
		});
		publishedGuide.publish();

		repository.shouldSearch(guide);
		repository.shouldSave();
		eventBus.shouldPublish(publishedGuide.pullDomainEvents());

		await guidePublisher.publish(guide.toPrimitives().id);
	});
});
