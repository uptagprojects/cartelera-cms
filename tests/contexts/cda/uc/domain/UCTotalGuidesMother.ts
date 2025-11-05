import { faker } from "@faker-js/faker";

import { UCTotalGuides } from "../../../../../src/contexts/cda/uc/domain/UCTotalGuides";

export class UCTotalGuidesMother {
	static create(value?: number): UCTotalGuides {
		return new UCTotalGuides(value ?? faker.number.int({ min: 0, max: 100 }));
	}
}
