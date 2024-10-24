import { faker } from "@faker-js/faker";

import { UserAvatar } from "../../../../../src/contexts/cma/users/domain/UserAvatar";

export class UserAvatarMother {
	static create(value?: string): UserAvatar {
		return new UserAvatar(value ?? faker.image.avatar());
	}
}
