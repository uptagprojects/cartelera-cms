import { Context } from "hono";
import { PostgresUserRepository } from "../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { getPool } from "../../../contexts/shared/infrastructure/PostgresConnection";
import { UserRegistrar } from "../../../contexts/cma/users/application/registrar/UserRegistrar";
import { InvalidArgumentError } from "../../../contexts/shared/domain/InvalidArgumentError";

const repository = new PostgresUserRepository(getPool());

export async function createUser(c: Context): Promise<Response> {
	const body = await c.req.parseBody();
    
    const id: string = body["id"] as string;
    const name: string = body["name"] as string;
    const email: string = body["email"] as string;
    const avatar: string = body["avatar"] as string;

    try {
        await new UserRegistrar(repository).register(id, name, email, avatar);
    } catch (err) {
        if(err instanceof InvalidArgumentError) {
            return c.body(err.message, 422);
        }
        return c.body("something happened", 503);
    }

    return c.text("", 201);
}