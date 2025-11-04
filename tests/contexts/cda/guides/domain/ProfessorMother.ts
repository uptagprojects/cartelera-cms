import { faker } from "@faker-js/faker";

import { ProfessorPrimitives } from "../../../../../src/contexts/cda/guides/domain/Professor/Professor";

export class ProfessorMother {
	static create(params?: Partial<ProfessorPrimitives>): ProfessorPrimitives {
		return {
			id: params?.id ?? faker.string.uuid(),
			name: params?.name ?? faker.person.fullName(),
			avatar: params?.avatar ?? faker.image.avatar()
		};
	}
}
