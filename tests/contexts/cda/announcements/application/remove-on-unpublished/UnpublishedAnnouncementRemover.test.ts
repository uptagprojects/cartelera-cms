import { UnpublishedAnnouncementRemover } from "../../../../../../src/contexts/cda/announcements/application/remove-on-unpublished/UnpublishedAnnouncementRemover";
import { CdaAnnouncementMother } from "../../domain/CdaAnnouncementMother";
import { MockCdaAnnouncementRepository } from "../../infrastructure/MockCdaAnnouncementRepository";

describe("UnpublishedAnnouncementRemover should", () => {
	const repository = new MockCdaAnnouncementRepository();
	const remover = new UnpublishedAnnouncementRemover(repository);

	it("remove an existing announcement", async () => {
		const announcement = CdaAnnouncementMother.create();

		repository.shouldSearch(announcement);
		repository.shouldRemove();

		await remover.remove(announcement.id.value);
	});

	it("do nothing when announcement does not exist", async () => {
		const id = "00000000-0000-0000-0000-000000000000";

		repository.shouldSearch(null);

		await remover.remove(id);
	});
});
