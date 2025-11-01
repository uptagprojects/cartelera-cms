import { Course } from "../../domain/Course";
import { CourseRepository } from "../../domain/CourseRepository";

export class AllCoursesSearcher {
    constructor(private readonly repository: CourseRepository) {}

    async searchAll(): Promise<Course[]> {
        return this.repository.searchAll();
    }
}
