import { PublishedGuideUpdater } from "../../../../../../src/contexts/cda/guides/application/update-on-published/PublishedGuideUpdater";
import { GuideAttachmentMother } from "../../../../cma/guide-attachments/domain/GuideAttachmentMother";
import { UserMother } from "../../../../cma/users/domain/UserMother";
import { MockUserFinder } from "../../../../cma/users/infrastructure/MockUserFinder";
import { MockMarkdownRemover } from "../../../../shared/infrastructure/MockMarkdownRemover";
import { GuideMother } from "../../domain/GuideMother";
import { UCMother } from "../../domain/UCMother";
import { MockGuideAttachmentsByGuideSearcher } from "../../infrastructure/MockGuideAttachmentsByGuideSearcher";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";
import { MockUCFinder } from "../../infrastructure/MockUCFinder";

describe("PublishedGuideUpdater should", () => {
	const repository = new MockGuideRepository();
	const ucFinder = new MockUCFinder();
	const attachmentSearcher = new MockGuideAttachmentsByGuideSearcher();
	const userFinder = new MockUserFinder();
	const mdRemover = new MockMarkdownRemover();
	const updater = new PublishedGuideUpdater(
		repository,
		ucFinder,
		attachmentSearcher,
		userFinder,
		mdRemover
	);

	it("create a new guide when it does not exist", async () => {
		const uc = UCMother.create();
		const user = UserMother.active();
		const guide = GuideMother.create();
		const title = "New Guide";
		const content = "# New Guide Content";
		const contentWrapped = "New Guide Content";

		repository.shouldSearch(null);
		ucFinder.shouldFind(uc);
		attachmentSearcher.shouldSearch([]);
		userFinder.shouldFind(user);
		mdRemover.shouldRemove(content, contentWrapped);
		repository.shouldSave();

		await updater.update(
			guide.toPrimitives().id,
			title,
			content,
			uc.toPrimitives().id,
			user.toPrimitives().id,
			new Date()
		);
	});

	it("update an existing guide", async () => {
		const existingGuide = GuideMother.create();
		const uc = UCMother.create();
		const attachment = GuideAttachmentMother.create({
			guideId: existingGuide.toPrimitives().id
		});
		const newTitle = "Updated Title";
		const newContent = "# Updated Content";
		const contentWrapped = "Updated Content";

		repository.shouldSearch(existingGuide);
		ucFinder.shouldFind(uc);
		attachmentSearcher.shouldSearch([attachment]);
		mdRemover.shouldRemove(newContent, contentWrapped);
		repository.shouldSave();

		await updater.update(
			existingGuide.toPrimitives().id,
			newTitle,
			newContent,
			uc.toPrimitives().id,
			existingGuide.toPrimitives().professor.id,
			new Date()
		);
	});
});
