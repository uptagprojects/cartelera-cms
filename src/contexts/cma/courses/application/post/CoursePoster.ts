import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Course } from "../../domain/Course";
import { CourseDurationPrimitives } from "../../domain/CourseDuration/CourseDuration";
import { CourseInstructorPrimitives } from "../../domain/CourseInstructor/CourseInstructor";
import { CourseRepository } from "../../domain/CourseRepository";

export class CoursePoster {
    constructor(
        private readonly repository: CourseRepository,
        private readonly eventBus: EventBus
    ) { }

    async post(
        id: string,
        name: string,
        abstract: string,
        picture: string,
        instructor: CourseInstructorPrimitives,
        location: string,
        duration: CourseDurationPrimitives,
        price: number,
        creation: string,
        lastUpdate: string): Promise<void> {

        const course = Course.create(id, name, abstract, picture, instructor, location, duration, price, creation, lastUpdate);
        await this.repository.save(course);
        await this.eventBus.publish(course.pullDomainEvents());
    }
}