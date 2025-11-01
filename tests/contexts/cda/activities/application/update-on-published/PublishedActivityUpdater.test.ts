import { faker } from "@faker-js/faker";

import { PublishedActivityUpdater } from "../../../../../../src/contexts/cda/activities/application/update-on-published/PublishedActivityUpdater";
import { Activity } from "../../../../../../src/contexts/cda/activities/domain/Activity";
import { ActivityType } from "../../../../../../src/contexts/cda/activities/domain/ActivityType";
import { ActivityMother } from "../../domain/ActivityMother";
import { MockActivityRepository } from "../../infrastructure/MockActivityRepository";
import { MockMarkdownRemover } from "../../../../shared/infrastructure/MockMarkdownRemover";

describe("PublishedActivityUpdater should", () => {
	const repository = new MockActivityRepository();
	const mdRemover = new MockMarkdownRemover();
	const updater = new PublishedActivityUpdater(repository, mdRemover);

	it("create a new activity when it does not exist", async () => {
		const id = faker.string.uuid();
		const type = ActivityType.ANNOUNCEMENT;
		const title = faker.lorem.sentence();
		const context = faker.lorem.paragraph();
		const contextWithoutMarkdown = faker.lorem.paragraph();
		const occurredOn = faker.date.recent();

		repository.shouldSearch(null);
		mdRemover.shouldRemove(context, contextWithoutMarkdown);
		repository.shouldSave();

		await updater.update(id, type, title, context, occurredOn);
	});

	it("update an existing activity when it exists", async () => {
		const existingActivity = ActivityMother.create();
		const id = existingActivity.id.value;
		const type = existingActivity.type;
		const title = faker.lorem.sentence();
		const context = faker.lorem.paragraph();
		const occurredOn = faker.date.recent();

		const expectedActivity = Activity.fromPrimitives({
			...existingActivity.toPrimitives(),
			title,
			context
		});

		repository.shouldSearch(existingActivity);
		repository.shouldSave();

		await updater.update(id, type, title, context, occurredOn);
	});
});
