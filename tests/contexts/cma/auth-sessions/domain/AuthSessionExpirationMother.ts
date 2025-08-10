import { faker } from "@faker-js/faker";
import { AuthSessionExpiration } from "../../../../../src/contexts/cma/auth-sessions/domain/AuthSessionExpiration";


export class AuthSessionExpirationMother {
	static create(value?: Date): AuthSessionExpiration {
		return new AuthSessionExpiration(value ?? faker.date.future());
	}

	static createExpired(): AuthSessionExpiration {
		return new AuthSessionExpiration(faker.date.past());
	}
}
