import { IncreaseTotalGuidesOnGuidePublished } from "../../../../../../src/contexts/cda/uc/application/increase-total-guides-on-guide-published/IncreaseTotalGuidesOnGuidePublished";
import { UCTotalGuidesIncreaser } from "../../../../../../src/contexts/cda/uc/application/increase-total-guides-on-guide-published/UCTotalGuidesIncreaser";
import { GuidePublishedDomainEventMother } from "../../../../cma/guides/domain/event/GuidePublishedDomainEventMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("IncreaseTotalGuidesOnGuidePublished should", () => {
	const repository = new MockUCRepository();
	const increaser = new UCTotalGuidesIncreaser(repository);
	const subscriber = new IncreaseTotalGuidesOnGuidePublished(increaser);

	it("increase total guides when a guide is published", async () => {
		const event = GuidePublishedDomainEventMother.create();

		const incrementSpy = jest.spyOn(increaser, "increment");

		await subscriber.on(event);

		expect(incrementSpy).toHaveBeenCalledWith(event.ucId);
	});
});
