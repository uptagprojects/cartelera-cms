import { Service } from "diod";

import { Course } from "../../domain/Course";
import { CourseDurationPrimitives } from "../../domain/CourseDuration/CourseDuration";
import { CourseId } from "../../domain/CourseId";
import { CourseInstructorPrimitives } from "../../domain/CourseInstructor/CourseInstructor";
import { CourseRepository } from "../../domain/CourseRepository";

@Service()
export class PublishedCourseUpdater {
    constructor(private readonly repository: CourseRepository) {}

    async update(
        id: string,
        name: string,
        abstract: string,
        price: number,
        duration: CourseDurationPrimitives,
        instructor: CourseInstructorPrimitives
    ): Promise<void> {
        let course = await this.repository.search(new CourseId(id));

        if (!course) {
            course = Course.create(id, name, abstract, instructor, duration, price);
        } else {
            course.updateName(name);
            course.updateAbstract(abstract);
            course.updatePrice(price);
            course.updateDuration(duration);
            course.updateInstructor(instructor);
        }

        await this.repository.save(course);
    }
}
