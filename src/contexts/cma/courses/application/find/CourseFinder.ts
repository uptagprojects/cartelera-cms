import { Course } from "../../domain/Course";
import { CourseFinder as DomainEventFinder } from "../../domain/CourseFinder";
import { CourseRepository } from "../../domain/CourseRepository";

export class CourseFinder {
	constructor(private readonly repository: CourseRepository) {}

	async find(id: string): Promise<Course> {
		const finder = new DomainEventFinder(this.repository);

		return finder.find(id);
	}
}
