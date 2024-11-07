import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/InvalidArgumentError";
import { CoursePoster } from "../../../../../contexts/cma/courses/application/post/CoursePoster";
import { PostgresCourseRepository } from "../../../../../contexts/cma/courses/infrastructure/PostgresCourseRepository";
import { CourseDoesNotExists } from "../../../../../contexts/cma/courses/domain/CourseDoesNotExists";
import { CourseFinder } from "../../../../../contexts/cma/courses/application/find/CourseFinder";

const courseValidator = z.object({
	id: z.string().uuid(),
	name: z.string(),
	abstract: z.string(),
	picture: z.string(),
	instructor: z.object({
		name: z.string(),
		badge: z.string(),
		email: z.string().email(),
		avatar: z.string(),
		relatedUrl: z.string().url()
	}),
	location: z.string(),
	duration: z.object({
		startDate: z.string().date(),
		finishDate: z.string().date(),
		academicHours: z.number(),
	}),
	price: z.number(),
	creation: z.string().date(),
	lastUpdate: z.string().date(),
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const json = await request.json();
	const parsed = courseValidator.safeParse(json);
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
				code: "invalid_course_id",
				message: "The course id in the URL does not match the course id in the body"
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
		await new CoursePoster(
			new PostgresCourseRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).post(id, body.name, body.abstract, body.picture, body.instructor, body.location, body.duration, body.price, body.creation, body.lastUpdate);
	} catch (error) {
		if (error instanceof CourseDoesNotExists) {
			return new Response(
				JSON.stringify({ code: "course_not_found", message: error.message }),
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
	let course = null;
	try {
		const courseRepository = new PostgresCourseRepository(postgresConnection);
		const courseFinder = new CourseFinder(courseRepository);
		course = await courseFinder.find(id);
	} catch (error) {
		if (error instanceof CourseDoesNotExists) {
			return new Response(
				JSON.stringify({ code: "course_not_found", message: error.message }),
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

	return NextResponse.json(course.toPrimitives());
}
