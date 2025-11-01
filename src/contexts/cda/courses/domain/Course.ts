import { CourseAbstract } from "./CourseAbstract";
import { CourseDuration, CourseDurationPrimitives } from "./CourseDuration/CourseDuration";
import { CourseId } from "./CourseId";
import { CourseInstructor, CourseInstructorPrimitives } from "./CourseInstructor/CourseInstructor";
import { CourseName } from "./CourseName";
import { CoursePrice } from "./CoursePrice";

export interface CdaCoursePrimitives {
    id: string;
    name: string;
    abstract: string;
    instructor: CourseInstructorPrimitives;
    duration: CourseDurationPrimitives;
    price: number;
}

export class Course {
    constructor(
        readonly id: CourseId,
        private name: CourseName,
        private abstract: CourseAbstract,
        private instructor: CourseInstructor,
        private duration: CourseDuration,
        private price: CoursePrice
    ) {}

    static create(
        id: string,
        name: string,
        abstract: string,
        instructor: CourseInstructorPrimitives,
        duration: CourseDurationPrimitives,
        price: number
    ): Course {
        return new Course(
            new CourseId(id),
            new CourseName(name),
            new CourseAbstract(abstract),
            CourseInstructor.fromPrimitives(instructor),
            CourseDuration.fromPrimitives(duration),
            new CoursePrice(price)
        );
    }

    static fromPrimitives(plainData: CdaCoursePrimitives): Course {
        return new Course(
            new CourseId(plainData.id),
            new CourseName(plainData.name),
            new CourseAbstract(plainData.abstract),
            CourseInstructor.fromPrimitives(plainData.instructor),
            CourseDuration.fromPrimitives(plainData.duration),
            new CoursePrice(plainData.price)
        );
    }

    toPrimitives(): CdaCoursePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            abstract: this.abstract.value,
            instructor: this.instructor.toPrimitives(),
            duration: this.duration.toPrimitives(),
            price: this.price.value
        };
    }

    updateName(name: string): void {
        this.name = new CourseName(name);
    }

    updateAbstract(abstract: string): void {
        this.abstract = new CourseAbstract(abstract);
    }

    updateInstructor(instructor: CourseInstructorPrimitives): void {
        this.instructor = CourseInstructor.fromPrimitives(instructor);
    }

    updateDuration(duration: CourseDurationPrimitives): void {
        this.duration = CourseDuration.fromPrimitives(duration);
    }

    updatePrice(price: number): void {
        this.price = new CoursePrice(price);
    }
}
