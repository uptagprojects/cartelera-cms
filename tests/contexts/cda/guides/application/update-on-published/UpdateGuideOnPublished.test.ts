import { PublishedGuideUpdater } from "../../../../../../src/contexts/cda/guides/application/update-on-published/PublishedGuideUpdater";
import { UpdateGuideOnPublished } from "../../../../../../src/contexts/cda/guides/application/update-on-published/UpdateGuideOnPublished";
import { GuidePublishedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuidePublishedDomainEvent";
import { UserMother } from "../../../../cma/users/domain/UserMother";
import { MockUserFinder } from "../../../../cma/users/infrastructure/MockUserFinder";
import { MockMarkdownRemover } from "../../../../shared/infrastructure/MockMarkdownRemover";
import { GuidePublishedDomainEventMother } from "../../domain/event/GuidePublishedDomainEventMother";
import { UCMother } from "../../domain/UCMother";
import { MockGuideAttachmentsByGuideSearcher } from "../../infrastructure/MockGuideAttachmentsByGuideSearcher";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";
import { MockUCFinder } from "../../infrastructure/MockUCFinder";

describe("UpdateGuideOnPublished should", () => {
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
	const subscriber = new UpdateGuideOnPublished(updater);

	it("be subscribed to GuidePublishedDomainEvent", () => {
		const subscribedTo = subscriber.subscribedTo();

		expect(subscribedTo).toContain(GuidePublishedDomainEvent);
	});

	it("have the correct name", () => {
		expect(subscriber.name()).toBe("pnfi.cda.update_guide_on_published");
	});

	it("update guide when GuidePublishedDomainEvent is triggered", async () => {
		const event = GuidePublishedDomainEventMother.create();
		const uc = UCMother.create();
		const user = UserMother.active();

		repository.shouldSearch(null);
		ucFinder.shouldFind(uc);
		attachmentSearcher.shouldSearch([]);
		userFinder.shouldFind(user);
		mdRemover.shouldRemove(event.content, event.content);
		repository.shouldSave();

		await subscriber.on(event);
	});
});
