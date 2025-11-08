import { faker } from "@faker-js/faker";

import { UC, UCPrimitives } from "../../../../../src/contexts/cda/uc/domain/UC";

export class UCMother {
	static create(params?: Partial<UCPrimitives>): UC {
		const primitives: UCPrimitives = {
			id: faker.string.uuid(),
			name: faker.lorem.word(),
			totalGuides: faker.number.int({ min: 0, max: 100 }),
			...params
		};

		return UC.fromPrimitives(primitives);
	}
}
