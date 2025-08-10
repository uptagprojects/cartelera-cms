import { faker } from "@faker-js/faker";

import { AuthSessionToken } from "../../../../../src/contexts/cma/auth-sessions/domain/AuthSessionToken";

export class AuthSessionTokenMother {
	static create(value?: string): AuthSessionToken {
		return new AuthSessionToken(value ?? faker.internet.jwt());
	}
}
