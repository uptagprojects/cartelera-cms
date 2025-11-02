import { faker } from "@faker-js/faker";

import { UserStatus } from "../../../../../src/contexts/cma/users/domain/UserStatus";

export class UserStatusMother {
	static create(value?: UserStatus): UserStatus {
		return value ?? faker.helpers.enumValue(UserStatus);
	}
}
