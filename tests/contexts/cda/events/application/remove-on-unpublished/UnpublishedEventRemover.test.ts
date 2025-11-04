import { UnpublishedEventRemover } from "../../../../../../src/contexts/cda/events/application/remove-on-unpublished/UnpublishedEventRemover";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("UnpublishedEventRemover should", () => {
	const repository = new MockEventRepository();
	const remover = new UnpublishedEventRemover(repository);

	it("remove an existing event", async () => {
		const event = EventMother.create();

		repository.shouldSearch(event);
		repository.shouldRemove();

		await remover.remove(event.toPrimitives().id);
	});

	it("do nothing when event does not exist", async () => {
		const event = EventMother.create();

		repository.shouldSearch(null);

		await remover.remove(event.toPrimitives().id);
	});
});
