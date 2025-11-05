import { PublishedUCUpdater } from "../../../../../../src/contexts/cda/uc/application/update-on-published/PublishedUCUpdater";
import { UCMother } from "../../domain/UCMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("PublishedUCUpdater should", () => {
	const repository = new MockUCRepository();
	const updater = new PublishedUCUpdater(repository);

	it("create a new UC when it does not exist", async () => {
		const ucId = "550e8400-e29b-41d4-a716-446655440000";
		const ucName = "New UC Name";

		repository.shouldSearch(null);
		repository.shouldSave();

		await updater.update(ucId, ucName);
	});

	it("update the name of an existing UC", async () => {
		const uc = UCMother.create();
		const ucId = uc.toPrimitives().id;
		const newName = "Updated Name";

		repository.shouldSearch(uc);
		repository.shouldSave();

		await updater.update(ucId, newName);

		expect(uc.toPrimitives().name).toBe(newName);
	});
});
