import { Course } from "../../domain/Course";
import { CourseId } from "../../domain/CourseId";
import { CourseRepository } from "../../domain/CourseRepository";

export class CourseSearcher {
	constructor(private readonly repository: CourseRepository) {}

	async search(id: string): Promise<Course | null> {
		return this.repository.search(new CourseId(id));
	}
}
