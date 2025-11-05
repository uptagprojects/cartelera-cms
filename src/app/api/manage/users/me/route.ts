import { NextRequest } from "next/server";

import { UserEmailFinder } from "../../../../../contexts/cma/users/application/find-by-email/UserEmailFinder";
import { UserDoesNotExistError } from "../../../../../contexts/cma/users/domain/UserDoesNotExistError";
import { PostgresUserRepository } from "../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { HTTPNextResponse } from "../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { createClient } from "../../../../../lib/supabase/server";

export async function GET(_: NextRequest): Promise<Response> {
	// Get the user from Supabase
	const supabase = createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	// Check for the Supabase user's email
	if (!user?.email) {
		return HTTPNextResponse.unauthorizedError();
	}

	const postgresConnection = new PostgresConnection();
	try {
		const userRepository = new PostgresUserRepository(postgresConnection);
		const userFinder = new UserEmailFinder(userRepository);

		// Use the Supabase user's email to find the app user
		const appUser = await userFinder.find(user.email);

		return HTTPNextResponse.json(appUser);
	} catch (error) {
		if (error instanceof UserDoesNotExistError) {
			return HTTPNextResponse.domainError(error, 403);
		}

		return HTTPNextResponse.internalServerError();
	}
}
