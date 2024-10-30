import { NextRequest, NextResponse } from "next/server";

import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresCourseRepository } from "../../../../contexts/cda/courses/infrastructure/PostgresCourseRepository";
import { CourseDoesNotExists } from "../../../../contexts/cda/courses/domain/CourseDoesNotExists";
import { CourseFinder } from "../../../../contexts/cda/courses/application/find/CourseFinder";

export async function GET(
	_: NextRequest,
	{ params: { id } }: { params: { id: string } }
): Promise<Response> {
	const postgresConnection = new PostgresConnection();
	let course = null;
	try {
		const courseRepository = new PostgresCourseRepository(postgresConnection);
		const couseFinder = new CourseFinder(courseRepository);
		course = await couseFinder.find(id);
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
