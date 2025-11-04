import { UnpublishedGuideRemover } from "../../../../../../src/contexts/cda/guides/application/remove-on-unpublished/UnpublishedGuideRemover";
import { GuideMother } from "../../domain/GuideMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("UnpublishedGuideRemover should", () => {
	const repository = new MockGuideRepository();
	const remover = new UnpublishedGuideRemover(repository);

	it("remove an existing guide", async () => {
		const guide = GuideMother.create();

		repository.shouldSearch(guide);
		repository.shouldRemove();

		await remover.remove(guide.toPrimitives().id);
	});

	it("do nothing when guide does not exist", async () => {
		const guide = GuideMother.create();

		repository.shouldSearch(null);

		await remover.remove(guide.toPrimitives().id);
	});
});
