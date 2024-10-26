import { type Context } from "hono";

import { CourseFinder } from "../../../contexts/cda/courses/application/find/CourseFinder";
import { Course } from "../../../contexts/cda/courses/domain/Course";
import { CourseDoesNotExists } from "../../../contexts/cda/courses/domain/CourseDoesNotExists";
import { PostgresCourseRepository } from "../../../contexts/cda/courses/infrastructure/PostgresCourseRepository";
import { InvalidIdentifierError } from "../../../contexts/shared/domain/InvalidIdentifierError";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";

const repository = new PostgresCourseRepository(new PostgresConnection());

export async function getOneCourse(c: Context): Promise<Response> {
	const courseFinder = new CourseFinder(repository);
	let course: Course | null = null;

	try {
		course = await courseFinder.find(c.req.param("courseId"));
	} catch (error) {
		if (error instanceof CourseDoesNotExists) {
			return c.body(error.message);
		}
		if (error instanceof InvalidIdentifierError) {
			return c.body("Id is not valid", 400);
		}

		return c.body("Unexpected error", 503);
	}

	c.status(200);

	return c.json(course.toPrimitives());
}
