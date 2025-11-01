import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ScheduleFinder } from "../../../../../contexts/cma/schedules/application/find/ScheduleFinder";
import { SchedulePoster } from "../../../../../contexts/cma/schedules/application/post/SchedulePoster";
import { ScheduleDoesNotExist } from "../../../../../contexts/cma/schedules/domain/ScheduleDoesNotExist";
import { PostgresScheduleRepository } from "../../../../../contexts/cma/schedules/infrastructure/PostgresScheduleRepository";
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

const validator = z.object({
    id: z.string().uuid(),
    name: z.string(),
    startDate: z.date(),
    finishDate: z.date()
});

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    const { id } = await params;
    const json = await request.json();
    const parsed = validator.safeParse(json);
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
                code: "invalid_schedule_id",
                message: "The schedule id in the URL does not match the schedule id in the body"
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
        await new SchedulePoster(
            new PostgresScheduleRepository(postgresConnection),
            new RabbitMQEventBus(new RabbitMQConnection(), new DomainEventFailover(postgresConnection))
        ).post(id, body.name, body.startDate.toISOString(), body.finishDate.toISOString());
    } catch (error) {
        if (error instanceof InvalidArgumentError) {
            return new Response(JSON.stringify({ code: "invalid_argument", message: error.message }), {
                status: 422,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        return new Response(JSON.stringify({ code: "unexpected_error", message: "Something happened" }), {
            status: 503,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return new Response("", { status: 201 });
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    const { id } = await params;
    const postgresConnection = new PostgresConnection();
    let schedule = null;
    try {
        const scheduleRepository = new PostgresScheduleRepository(postgresConnection);
        const scheduleFinder = new ScheduleFinder(scheduleRepository);
        schedule = await scheduleFinder.find(id);
    } catch (error) {
        if (error instanceof ScheduleDoesNotExist) {
            return new Response(JSON.stringify({ code: "schedule_not_found", message: error.message }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        return new Response(JSON.stringify({ code: "unexpected_error", message: "Something happened" }), {
            status: 503,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return NextResponse.json(schedule.toPrimitives());
}
