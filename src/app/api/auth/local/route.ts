import { NextRequest } from "next/server";
import { LocalAuthenticationFormSchema } from "../../../actions/localAuthentication";
import { User } from "../../../../contexts/cma/users/domain/User";
import { PostgresUserRepository } from "../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { UserEmailIsNotValid } from "../../../../contexts/cma/users/domain/UserEmailIsNotValid";
import { InvalidArgumentError } from "../../../../contexts/shared/domain/InvalidArgumentError";
import { UserDoesNotExist } from "../../../../contexts/cma/users/domain/UserDoesNotExist";

export async function POST(req: NextRequest, _res: Response): Promise<Response> {
    const json = await req.json();
	const parsed = LocalAuthenticationFormSchema.safeParse(json);

    if (!parsed.success) {
		return new Response(JSON.stringify({ message: parsed.error.message }), {
			status: 422,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

    let user: User;
	try {
        /*new Authentication(
            new PostgresUserRepository(new PostgresConnection())
        );
		user = await userAuthenticator.authenticateByEmail(email, password);

		if (!user) {
			return c.body("Correo o contraseña incorrectos", 422, {});
		}*/
	} catch (err) {
        if (err instanceof UserDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "user_not_found", message: err.message }),
				{
					status: 404,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
		}

		if (
			err instanceof InvalidArgumentError
		) {
			return new Response(
				JSON.stringify({ code: "invalid_argument", message: err.message }),
				{
					status: 422,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
		}

		return new Response(
			JSON.stringify({ code: "unexpected_error", message: "Something happened" }),
			{
				status: 503,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}

    return Response.json(user.toPrimitives(), { status: 200 });
}