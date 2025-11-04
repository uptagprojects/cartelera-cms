import { PublishedEventUpdater } from "../../../../../../src/contexts/cda/events/application/update-on-published/PublishedEventUpdater";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("PublishedEventUpdater should", () => {
	const repository = new MockEventRepository();
	const updater = new PublishedEventUpdater(repository);

	it("create a new event when it does not exist", async () => {
		const event = EventMother.create();
		const primitives = event.toPrimitives();

		repository.shouldSearch(null);
		repository.shouldSave();

		await updater.update(
			primitives.id,
			primitives.name,
			primitives.location,
			primitives.startDate,
			primitives.endDate
		);
	});

	it("update an existing event", async () => {
		const event = EventMother.create();
		const primitives = event.toPrimitives();
		const newName = "Updated Event Name";
		const newLocation = "Updated Location";
		const newStartDate = new Date("2025-01-01").toISOString();
		const newEndDate = new Date("2025-01-31").toISOString();

		repository.shouldSearch(event);
		repository.shouldSave();

		await updater.update(
			primitives.id,
			newName,
			newLocation,
			newStartDate,
			newEndDate
		);
	});
});
