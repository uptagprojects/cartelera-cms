import { Course } from "./Course";
import { CourseDoesNotExists } from "./CourseDoesNotExists";
import { CourseId } from "./CourseId";
import { CourseRepository } from "./CourseRepository";

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
