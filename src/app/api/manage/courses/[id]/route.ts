import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { CoursePublisher } from "../../../../../contexts/cma/courses/application/publish/CoursePublisher";
import { CourseDoesNotExists } from "../../../../../contexts/cma/courses/domain/CourseDoesNotExists";
import { CourseDurationPrimitives } from "../../../../../contexts/cma/courses/domain/CourseDuration/CourseDuration";
import { CourseFinder } from "../../../../../contexts/cma/courses/domain/CourseFinder";
import { CourseInstructorPrimitives } from "../../../../../contexts/cma/courses/domain/CourseInstructor/CourseInstructor";
import { PostgresCourseRepository } from "../../../../../contexts/cma/courses/infrastructure/PostgresCourseRepository";
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

const validator = z.object({
	id: z.string().uuid(),
	name: z.string(),
	abstract: z.string(),
	picture: z.string().url(),
	instructor: z.object({
		id: z.string().uuid(),
		name: z.string(),
		email: z.string().email(),
		badge: z.string(),
		avatar: z.string().url(),
		relatedUrl: z.string().url()
	}),
	location: z.string(),
	duration: z.object({
		startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		finishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		academicHours: z.number().min(1)
	}),
	price: z.number().min(0)
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
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
		await new CoursePublisher(
			new PostgresCourseRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).post(
			id,
			body.name,
			body.abstract,
			body.picture,
			body.instructor as CourseInstructorPrimitives,
			body.location,
			body.duration as CourseDurationPrimitives,
			body.price
		);
	} catch (error) {
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

	try {
		const courseRepository = new PostgresCourseRepository(postgresConnection);
		const courseFinder = new CourseFinder(courseRepository);
		const course = await courseFinder.find(id);

		return NextResponse.json(course.toPrimitives());
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
}
