import { faker } from "@faker-js/faker";

import { UCName } from "../../../../../src/contexts/cda/uc/domain/UCName";

export class UCNameMother {
	static create(value?: string): UCName {
		return new UCName(value ?? faker.company.name());
	}
}
