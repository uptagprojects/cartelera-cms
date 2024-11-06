import { NextRequest, NextResponse } from "next/server";
import { CredentialRegistrar } from "../../../../contexts/cma/credentials/application/register/CredentialRegistrar";
import { WebauthnCredentialCertifier } from "../../../../contexts/cma/credentials/infrastructure/WebauthnCredentialCertifier";
import { UserFinder } from "../../../../contexts/cma/users/domain/UserFinder";
import { RabbitMQEventBus } from "../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { RabbitMQConnection } from "../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { DomainEventFailover } from "../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { PostgresCredentialRepository } from "../../../../contexts/cma/credentials/infrastructure/PostgresCredentialRepository";
import { PostgresUserRepository } from "../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";
import { OfficialUuidGenerator } from "../../../../contexts/shared/infrastructure/OfficialUuidGenerator";
import { PublicKeyCredentialWithAttestationJSON } from "@github/webauthn-json";
import { sessionOptions } from "../../../../contexts/shared/infrastructure/sessionOptions";
import { cookies } from "next/headers";
import { IronSessionData, getIronSession } from "iron-session";
import { CredentialCertifierVerificationError } from "../../../../contexts/cma/credentials/domain/CredentialCeritifierVerificationError";

const connection = new PostgresConnection();
const userFinder = new UserFinder(new PostgresUserRepository(connection));
const registrar = new CredentialRegistrar(
	new WebauthnCredentialCertifier(),
	userFinder,
	new PostgresCredentialRepository(connection),
	new RabbitMQEventBus(
		new RabbitMQConnection(),
		new DomainEventFailover(connection)
	)
);

export async function POST(req: NextRequest): Promise<Response> {
	const { id, email, credential } = await req.json();
	const session = await getIronSession<IronSessionData>(await cookies(), sessionOptions);
	const challenge = session.challenge ?? "";

	const uuidGenerator = new OfficialUuidGenerator();

	let user = null;
	try {
		user = await userFinder.find(id);
		const { email: expectedEmail } = user.toPrimitives();

		if(expectedEmail !== email) {
			return NextResponse.json({ error: "Invalid user" }, {
				status: 400,
				headers: {
					"Content-Type": "application/json"
				},
			});
		}

		await registrar.register(
			await uuidGenerator.generate(),
			id,
			{
				challenge: challenge,
				credential: credential as PublicKeyCredentialWithAttestationJSON
			}
		);
	} catch (err) {
		if(err instanceof CredentialCertifierVerificationError) {
			return NextResponse.json({ error: "Invalid credential" }, {
				status: 400,
				headers: {
					"Content-Type": "application/json"
				},
			});
		} else {
			return NextResponse.json({ error: "Server failed, try again later" }, {
				status: 503,
				headers: {
					"Content-Type": "application/json"
				},
			});
		}
	}


	session.userId = user.getId().value;
	await session.save();


	return NextResponse.json({}, {
		status: 201,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
