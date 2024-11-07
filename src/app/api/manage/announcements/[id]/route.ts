import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresAnnouncementRepository } from "../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
import { AnnouncementFinder } from "../../../../../contexts/cma/announcements/application/find/AnnouncementFinder";
import { AnnouncementDoesNotExists } from "../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExists";
import { AnnouncementPoster } from "../../../../../contexts/cma/announcements/application/post/AnnouncementPoster";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/InvalidArgumentError";

const announcementValidator = z.object({
	id: z.string().uuid(),
	title: z.string(),
	content: z.string(),
	publishDate: z.string().date(),
	type: z.string(),
	status: z.string(),
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const json = await request.json();
	const parsed = announcementValidator.safeParse(json);
	if (!parsed.success) {
		return new Response(JSON.stringify({ message: parsed.error.message }), {
			status: 422,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	if (id !== parsed.data.id) {
		return new Response(
			JSON.stringify({
				code: "invalid_announcement_id",
				message: "The announcement id in the URL does not match the announcement id in the body"
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}

	const { data: body } = parsed;

	const postgresConnection = new PostgresConnection();

	try {
		await new AnnouncementPoster(
			new PostgresAnnouncementRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).post(id, body.title, body.content, body.publishDate, body.type);
	} catch (error) {
		if (error instanceof AnnouncementDoesNotExists) {
			return new Response(
				JSON.stringify({ code: "announcement_not_found", message: error.message }),
				{
					status: 404,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
		}

		if (error instanceof InvalidArgumentError) {
			return new Response(
				JSON.stringify({ code: "invalid_argument", message: error.message }),
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

	return new Response("", { status: 201 });
}


export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();
	let announcement = null;
	try {
		const announcementRepository = new PostgresAnnouncementRepository(postgresConnection);
		const announcementFinder = new AnnouncementFinder(announcementRepository);
		announcement = await announcementFinder.find(id);
	} catch (error) {
		if (error instanceof AnnouncementDoesNotExists) {
			return new Response(
				JSON.stringify({ code: "announcement_not_found", message: error.message }),
				{
					status: 404,
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

	return NextResponse.json(announcement.toPrimitives());
}
