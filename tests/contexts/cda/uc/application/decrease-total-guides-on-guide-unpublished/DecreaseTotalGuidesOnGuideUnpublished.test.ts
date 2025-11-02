import { DecreaseTotalGuidesOnGuideUnpublished } from "../../../../../../src/contexts/cda/uc/application/decrease-total-guides-on-guide-unpublished/DecreaseTotalGuidesOnGuideUnpublished";
import { UCTotalGuidesDecreaser } from "../../../../../../src/contexts/cda/uc/application/decrease-total-guides-on-guide-unpublished/UCTotalGuidesDecreaser";
import { GuideArchivedDomainEventMother } from "../../../../cma/guides/domain/event/GuideArchivedDomainEventMother";
import { GuideRemovedDomainEventMother } from "../../../../cma/guides/domain/event/GuideRemovedDomainEventMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("DecreaseTotalGuidesOnGuideUnpublished should", () => {
	const repository = new MockUCRepository();
	const decreaser = new UCTotalGuidesDecreaser(repository);
	const subscriber = new DecreaseTotalGuidesOnGuideUnpublished(decreaser);

	it("decrease total guides when a guide is archived", async () => {
		const event = GuideArchivedDomainEventMother.create();

		const decrementSpy = jest.spyOn(decreaser, "decrement");

		await subscriber.on(event);

		expect(decrementSpy).toHaveBeenCalledWith(event.ucId);
	});

	it("decrease total guides when a guide is removed", async () => {
		const event = GuideRemovedDomainEventMother.create();

		const decrementSpy = jest.spyOn(decreaser, "decrement");

		await subscriber.on(event);

		expect(decrementSpy).toHaveBeenCalledWith(event.ucId);
	});
});
