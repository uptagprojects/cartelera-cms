import { NextRequest } from "next/server";

import { UserEmailFinder } from "../../../../../contexts/cma/users/application/find-by-email/UserEmailFinder";
import { UserDoesNotExistError } from "../../../../../contexts/cma/users/domain/UserDoesNotExistError";
import { PostgresUserRepository } from "../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { HTTPNextResponse } from "../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { auth } from "../../../../../lib/auth";

export async function GET(_: NextRequest): Promise<Response> {
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

        return HTTPNextResponse.internalServerError();
    }
}
