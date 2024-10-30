import { NextRequest, NextResponse } from "next/server";

import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresEventRepository } from "../../../../contexts/cda/events/infrastructure/PostgresEventRepository";
import { EventFinder } from "../../../../contexts/cda/events/application/find/EventFinder";
import { EventDoesNotExists } from "../../../../contexts/cda/events/domain/EventDoesNotExists";

export async function GET(
	_: NextRequest,
	{ params: { id } }: { params: { id: string } }
): Promise<Response> {
	const postgresConnection = new PostgresConnection();
	let event = null;
	try {
		const eventRepository = new PostgresEventRepository(postgresConnection);
		const eventFinder = new EventFinder(eventRepository);
		event = await eventFinder.find(id);
	} catch (error) {
		if (error instanceof EventDoesNotExists) {
			return new Response(
				JSON.stringify({ code: "event_not_found", message: error.message }),
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

	return NextResponse.json(event.toPrimitives());
}
