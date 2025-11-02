import { RemoveOnUCUnpublished } from "../../../../../../src/contexts/cda/uc/application/remove-on-unpublished/RemoveOnUCUnpublished";
import { UnpublishedUCRemover } from "../../../../../../src/contexts/cda/uc/application/remove-on-unpublished/UnpublishedUCRemover";
import { UCRemovedDomainEventMother } from "../../../../cma/uc/domain/event/UCRemovedDomainEventMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("RemoveOnUCUnpublished should", () => {
	const repository = new MockUCRepository();
	const remover = new UnpublishedUCRemover(repository);
	const subscriber = new RemoveOnUCUnpublished(remover);

	it("remove UC when a UC is removed", async () => {
		const event = UCRemovedDomainEventMother.create();

		const removeSpy = jest.spyOn(remover, "remove");

		await subscriber.on(event);

		expect(removeSpy).toHaveBeenCalledWith(event.id);
	});
});
