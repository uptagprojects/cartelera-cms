import { GuidePoster } from "../../../../../../src/contexts/cma/guides/application/post/GuidePoster";
import { Guide } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UCMother } from "../../../uc/domain/UCMother";
import { MockUCFinder } from "../../../uc/infrastructure/MockUCFinder";
import { UserMother } from "../../../users/domain/UserMother";
import { MockUserFinder } from "../../../users/infrastructure/MockUserFinder";
import { GuideContentMother } from "../../domain/GuideContentMother";
import { GuideIdMother } from "../../domain/GuideIdMother";
import { GuideTitleMother } from "../../domain/GuideTitleMother";
import { MockGuideRepository } from "../../infrastructure/MockGuideRepository";

describe("GuidePoster should", () => {
	const repository = new MockGuideRepository();
	const eventBus = new MockEventBus();
	const userFinder = new MockUserFinder();
	const ucFinder = new MockUCFinder();
	const guidePoster = new GuidePoster(repository, userFinder, ucFinder, eventBus);

	it("post a valid guide", async () => {
		const id = GuideIdMother.create().value;
		const title = GuideTitleMother.create().value;
		const content = GuideContentMother.create().value;
		const user = UserMother.create();
		const uc = UCMother.create();

		// Mock Date to ensure consistent timestamps
		const fixedDate = new Date("2025-11-01T12:00:00.000Z");
		jest.spyOn(global, "Date").mockImplementation(() => fixedDate as any);

		// Create a dummy guide to get the event with the right structure
		const dummyGuide = Guide.create(id, title, content, uc.toPrimitives().id, user.getId());
		const expectedEvent = dummyGuide.pullDomainEvents()[0];

		userFinder.shouldFind(user);
		ucFinder.shouldFind(uc.toPrimitives());
		repository.shouldSave();
		eventBus.shouldPublish([expectedEvent]);

		await guidePoster.post(id, title, content, uc.toPrimitives().id, user.getId());

		// Restore Date
		jest.restoreAllMocks();
	});
});
