import { Service } from "diod";
import { CourseRepository } from "../../domain/CourseRepository";
import { CourseId } from "../../domain/CourseId";
import { Course } from "../../domain/Course";
import { CourseDurationPrimitives } from "../../domain/CourseDuration/CourseDuration";
import { CourseInstructorPrimitives } from "../../domain/CourseInstructor/CourseInstructor";

@Service()
export class PublishedCourseUpdater {
    constructor(
        private readonly repository: CourseRepository,
    ) {}

    async update(
        id: string,
        name: string,
        abstract: string,
        price: number,
        duration: CourseDurationPrimitives,
        instructor: CourseInstructorPrimitives,
    ): Promise<void> {
        let course = await this.repository.search(new CourseId(id));
        
        if (!course) {
            course = Course.create(
                id,
                name,
                abstract,
                instructor,
                duration,
                price,
            );

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