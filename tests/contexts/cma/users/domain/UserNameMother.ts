import { faker } from "@faker-js/faker";

import { UserName } from "../../../../../src/contexts/cma/users/domain/UserName";

export class UserNameMother {
	static create(value?: string): UserName {
		return new UserName(value ?? `${faker.person.firstName()} ${faker.person.lastName()}`);
	}
}
