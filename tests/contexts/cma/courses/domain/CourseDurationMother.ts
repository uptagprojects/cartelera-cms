import { faker } from "@faker-js/faker";

import { CourseDurationPrimitives } from "../../../../../src/contexts/cma/courses/domain/CourseDuration/CourseDuration";

export class CourseDurationMother {
	static create(params?: Partial<CourseDurationPrimitives>): CourseDurationPrimitives {
		const startDate = faker.date.future();
		const finishDate = faker.date.future({ refDate: startDate });

		// Reset time to midnight to meet DateValueObject validation
		startDate.setHours(0, 0, 0, 0);
		finishDate.setHours(0, 0, 0, 0);

		return {
			startDate: startDate.toISOString(),
			finishDate: finishDate.toISOString(),
			academicHours: faker.number.int({ min: 1, max: 200 }),
			...params
		};
	}
}
