import { PublishedAnnouncementUpdater } from "../../../../../../src/contexts/cda/announcements/application/update-on-published/PublishedAnnouncementUpdater";
import { CdaAnnouncementMother } from "../../domain/CdaAnnouncementMother";
import { CdaAnnouncementIdMother } from "../../domain/CdaAnnouncementIdMother";
import { CdaAnnouncementTitleMother } from "../../domain/CdaAnnouncementTitleMother";
import { CdaAnnouncementContentMother } from "../../domain/CdaAnnouncementContentMother";
import { CdaAnnouncementTypeMother } from "../../domain/CdaAnnouncementTypeMother";
import { MockCdaAnnouncementRepository } from "../../infrastructure/MockCdaAnnouncementRepository";

describe("PublishedAnnouncementUpdater should", () => {
	const repository = new MockCdaAnnouncementRepository();
	const updater = new PublishedAnnouncementUpdater(repository);

	it("update an existing announcement", async () => {
		const announcement = CdaAnnouncementMother.create();
		const newTitle = CdaAnnouncementTitleMother.create().value;
		const newContent = CdaAnnouncementContentMother.create().value;

		repository.shouldSearch(announcement);
		repository.shouldSave();

		await updater.update(
			announcement.id.value,
			newTitle,
			newContent,
			announcement.toPrimitives().type
		);
	});

	it("create a new announcement when it does not exist", async () => {
		const id = CdaAnnouncementIdMother.create().value;
		const title = CdaAnnouncementTitleMother.create().value;
		const content = CdaAnnouncementContentMother.create().value;
		const type = CdaAnnouncementTypeMother.create();

		repository.shouldSearch(null);
		repository.shouldSave();

		await updater.update(id, title, content, type);
	});
});
