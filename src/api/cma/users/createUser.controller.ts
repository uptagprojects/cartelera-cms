import { Context } from "hono";

import { UserRegistrar } from "../../../contexts/cma/users/application/registrar/UserRegistrar";
import { PostgresUserRepository } from "../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { InvalidArgumentError } from "../../../contexts/shared/domain/InvalidArgumentError";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";
import { RabbitMQEventBus } from "../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { RabbitMQConnection } from "../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { DomainEventFailover } from "../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";

export async function createUser(c: Context): Promise<Response> {
	const connection = new PostgresConnection();
	const repository = new PostgresUserRepository(connection);
	const eventBus = new RabbitMQEventBus(
		new RabbitMQConnection(),
		new DomainEventFailover(connection)
	);
	const body = await c.req.parseBody();

	const id: string = body["id"] as string;
	const name: string = body["name"] as string;
	const email: string = body["email"] as string;
	const avatar: string = body["avatar"] as string;

	try {
		await new UserRegistrar(repository, eventBus).register(id, name, email, avatar);
	} catch (err) {
		if (err instanceof InvalidArgumentError) {
			return c.body(err.message, 422);
		}

		return c.body("something happened", 503);
	}

	return c.text("", 201);
}
