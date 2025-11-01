import { faker } from "@faker-js/faker";

import { Activity, ActivityPrimitives } from "../../../../../src/contexts/cda/activities/domain/Activity";
import { ActivityType } from "../../../../../src/contexts/cda/activities/domain/ActivityType";
import { ActivityIdMother } from "./ActivityIdMother";

export class ActivityMother {
	static create(params?: Partial<ActivityPrimitives>): Activity {
		const primitives: ActivityPrimitives = {
			id: ActivityIdMother.create().value,
			type: faker.helpers.arrayElement(["announcement", "course", "event", "guide"]) as ActivityType,
			title: faker.lorem.sentence(),
			context: faker.lorem.paragraph(),
			publishedDate: faker.date.recent().toISOString(),
			...params
		};

		return Activity.fromPrimitives(primitives);
	}
}
