import { NextRequest, NextResponse } from "next/server";

import { ScheduleFinder } from "../../../../../contexts/cma/schedules/application/find/ScheduleFinder";
import { ScheduleDoesNotExist } from "../../../../../contexts/cma/schedules/domain/ScheduleDoesNotExist";
import { PostgresScheduleRepository } from "../../../../../contexts/cma/schedules/infrastructure/PostgresScheduleRepository";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();
	let schedule = null;
	try {
		const scheduleRepository = new PostgresScheduleRepository(postgresConnection);
		const scheduleFinder = new ScheduleFinder(scheduleRepository);
		schedule = await scheduleFinder.find(id);
	} catch (error) {
		if (error instanceof ScheduleDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "schedule_not_found", message: error.message }),
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

	return NextResponse.json(schedule.toPrimitives());
}
