import { NextRequest } from "next/server";
import { UserDoesNotExistError } from "../../../../../contexts/cma/users/domain/UserDoesNotExistError";
import { auth } from "../../../../../lib/auth";
import { HTTPNextResponse } from "../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresUserRepository } from "../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { UserEmailFinder } from "../../../../../contexts/cma/users/application/find-by-email/UserEmailFinder";

export async function GET(
	_: NextRequest
): Promise<Response> {
    const session = await auth();
    if (!session?.user?.email) {
        return HTTPNextResponse.unauthorizedError();
    }
	const postgresConnection = new PostgresConnection();
	try {
		const userRepository = new PostgresUserRepository(postgresConnection);
		const userFinder = new UserEmailFinder(userRepository);
		const user = await userFinder.find(session.user.email);

        return HTTPNextResponse.json(user);
	} catch (error) {
		if (error instanceof UserDoesNotExistError) {
            return HTTPNextResponse.domainError(error, 403);
		}

		return HTTPNextResponse.internalServerError()
	}
}
