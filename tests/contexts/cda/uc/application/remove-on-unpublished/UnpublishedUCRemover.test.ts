import { UnpublishedUCRemover } from "../../../../../../src/contexts/cda/uc/application/remove-on-unpublished/UnpublishedUCRemover";
import { UCMother } from "../../domain/UCMother";
import { MockUCRepository } from "../../infrastructure/MockUCRepository";

describe("UnpublishedUCRemover should", () => {
	const repository = new MockUCRepository();
	const remover = new UnpublishedUCRemover(repository);

	it("remove an existing UC", async () => {
		const uc = UCMother.create();
		const ucId = uc.toPrimitives().id;

		repository.shouldSearch(uc);
		repository.shouldRemove();

		await remover.remove(ucId);
	});

	it("do nothing when UC does not exist", async () => {
		const ucId = "550e8400-e29b-41d4-a716-446655440000";

		repository.shouldSearch(null);

		await remover.remove(ucId);
	});
});
