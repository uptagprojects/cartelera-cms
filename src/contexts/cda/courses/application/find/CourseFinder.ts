import { Course } from "../../domain/Course";
import { CourseDoesNotExists } from "../../domain/CourseDoesNotExists";
import { CourseId } from "../../domain/CourseId";
import { CourseRepository } from "../../domain/CourseRepository";

export class CourseFinder {
	constructor(private readonly repository: CourseRepository) {}

	async find(id: string): Promise<Course> {
		const course = await this.repository.search(new CourseId(id));
		if (!course) {
			throw new CourseDoesNotExists(id);
		}

		return course;
	}
}
