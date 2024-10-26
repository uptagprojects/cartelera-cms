import { faker } from "@faker-js/faker";

import { UserPassword } from "../../../../../src/contexts/cma/users/domain/UserPassword";

export class UserPasswordMother {
	static create(value?: string): UserPassword {
		return new UserPassword(value ?? faker.internet.password());
	}
}
