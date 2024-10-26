import { type Context } from "hono";

import { CourseFinder } from "@/contexts/cda/courses/application/find/CourseFinder";
import { Course } from "@/contexts/cda/courses/domain/Course";
import { CourseDoesNotExists } from "@/contexts/cda/courses/domain/CourseDoesNotExists";
import { PostgresCourseRepository } from "@/contexts/cda/courses/infrastructure/PostgresCourseRepository";
import { InvalidIdentifierError } from "@/contexts/shared/domain/InvalidIdentifierError";
import { getPool } from "@/contexts/shared/infrastructure/PostgresPoolConnection";

const repository = new PostgresCourseRepository(getPool());

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

	// 	return c.json({
	// 		id: "5d16fd83-7b22-417e-8301-187036193946",
	// 		name: "Curso PHP Basico",
	// 		abstract: "Aprenderemos todo sobre PHP",
	// 		start_date: "2024-02-03",
	// 		finish_date: "2024-02-05",
	// 		duration: "PT12H",
	// 		periods: [
	// 			"2024-02-03T12:00:00/2024-02-03T16:00:00",
	// 			"2024-02-04T12:00:00/2024-02-04T16:00:00",
	// 			"2024-02-05T12:00:00/2024-02-05T16:00:00"
	// 		],
	// 		picture:
	// 			"https://fastly.picsum.photos/id/649/600/400.jpg?hmac=DYo_ps60GePCKwwn_W6ufVKyMoROAraGIBEjuL5y-c4",
	// 		instructor: {
	// 			name: "Juan Perez",
	// 			badge: "Senior PHP Developer para Shoppi",
	// 			avatar: "https://avatar.iran.liara.run/public/7",
	// 			related_url: "https://dev.to/juanperez"
	// 		},
	// 		available_seats: 20,
	// 		online: false,
	// 		location: "laboratorio 04",
	// 		price: 400.0
	// 	});
}
