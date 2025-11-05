import { PublishedUCUpdater } from "../../../../../../src/contexts/cda/uc/application/update-on-published/PublishedUCUpdater";
import { UpdateUCOnPublished } from "../../../../../../src/contexts/cda/uc/application/update-on-published/UpdateUCOnPublished";
import { UCCreatedDomainEventMother } from "../../../../cma/uc/domain/event/UCCreatedDomainEventMother";
import { UCRenamedDomainEventMother } from "../../../../cma/uc/domain/event/UCRenamedDomainEventMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UpdateUCOnPublished should", () => {
	const repository = new MockUCRepository();
	const updater = new PublishedUCUpdater(repository);
	const subscriber = new UpdateUCOnPublished(updater);

	it("update UC when a UC is created", async () => {
		const event = UCCreatedDomainEventMother.create();

		const updateSpy = jest.spyOn(updater, "update");

		await subscriber.on(event);

		expect(updateSpy).toHaveBeenCalledWith(event.id, event.name);
	});

	it("update UC when a UC is renamed", async () => {
		const event = UCRenamedDomainEventMother.create();

		const updateSpy = jest.spyOn(updater, "update");

		await subscriber.on(event);

		expect(updateSpy).toHaveBeenCalledWith(event.id, event.name);
	});
});
