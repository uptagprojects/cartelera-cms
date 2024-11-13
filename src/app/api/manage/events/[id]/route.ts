import { NextRequest, NextResponse } from "next/server";

import { EventFinder } from "../../../../../contexts/cma/events/application/find/EventFinder";
import { EventDoesNotExist } from "../../../../../contexts/cma/events/domain/EventDoesNotExist";
import { PostgresEventRepository } from "../../../../../contexts/cma/events/infrastructure/PostgresEventRepository";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	let event = null;
	try {
		const eventRepository = new PostgresEventRepository(new PostgresConnection());
		const guideFinder = new EventFinder(eventRepository);
		event = await guideFinder.find(id);
	} catch (error) {
		if (error instanceof EventDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "guide_not_found", message: error.message }),
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
