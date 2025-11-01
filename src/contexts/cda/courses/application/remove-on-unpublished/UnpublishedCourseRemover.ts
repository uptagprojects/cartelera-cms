import { Service } from "diod";

import { CourseId } from "../../domain/CourseId";
import { CourseRepository } from "../../domain/CourseRepository";

@Service()
export class UnpublishedCourseRemover {
    constructor(private readonly repository: CourseRepository) {}

    async remove(id: string): Promise<void> {
        const course = await this.repository.search(new CourseId(id));
        if (course) {
            await this.repository.remove(course);
        }
    }
}
