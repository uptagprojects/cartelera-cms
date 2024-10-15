import { type Context } from "hono";

import { UserAuthenticator } from "@/contexts/cma/users/application/authenticate/UserAuthenticator";
import { PasswordDoesNotMeetLengthRequirements } from "@/contexts/cma/users/domain/PasswordDoesNotMeetLengthRequirements";
import { User } from "@/contexts/cma/users/domain/User";
import { UserEmailIsNotValid } from "@/contexts/cma/users/domain/UserEmailIsNotValid";
import { PostgresUserRepository } from "@/contexts/cma/users/infrastructure/PostgresUserRepository";
import { getPool } from "@/contexts/shared/infrastructure/PostgresPoolConnection";

const repository = new PostgresUserRepository(getPool());

export async function authLocal(c: Context): Promise<Response> {
	const body = await c.req.parseBody();

	const userAuthenticator = new UserAuthenticator(repository);

	const email: string = body["email"] as string;
	const password: string = body["password"] as string;

	let user: User | null = null;
	try {
		user = await userAuthenticator.authenticateByEmail(email, password);

		if (!user) {
			return c.body("Correo o contraseña incorrectos", 422, {});
		}
	} catch (err) {
		if (
			err instanceof UserEmailIsNotValid ||
			err instanceof PasswordDoesNotMeetLengthRequirements
		) {
			return c.body(err.message);
		}

		return c.body("Unexpected error", 503);
	}

	c.status(200);

	return c.json([]);
}
