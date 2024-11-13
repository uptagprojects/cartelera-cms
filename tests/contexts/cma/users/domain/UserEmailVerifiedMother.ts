import { faker } from "@faker-js/faker";

import { UserEmailVerified } from "../../../../../src/contexts/cma/users/domain/UserEmailVerified";

export class UserEmailVerifiedMother {
	static create(value?: Date): UserEmailVerified {
		return new UserEmailVerified(value ?? faker.date.recent());
	}
}
