import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { CourseAbstract } from "./CourseAbstract";
import { CourseCreation } from "./CourseCreation";
import { CourseDuration, CourseDurationPrimitives } from "./CourseDuration/CourseDuration";
import { CourseId } from "./CourseId";
import { CourseInstructor, CourseInstructorPrimitives } from "./CourseInstructor/CourseInstructor";
import { CourseLocation } from "./CourseLocation";
import { CourseName } from "./CourseName";
import { CoursePicture } from "./CoursePicture";
import { CoursePrice } from "./CoursePrice";
import { CourseUpdate } from "./CourseUpdate";
import { CourseAbstractUpdatedDomainEvent } from "./events/CourseAbstractUpdatedDomainEvent";
import { CourseLocationUpdatedDomainEvent } from "./events/CourseLocationUpdatedDomainEvent";
import { CourseNameUpdatedDomainEvent } from "./events/CourseNameUpdatedDomainEvent";
import { CoursePictureUpdatedDomainEvent } from "./events/CoursePictureUpdatedDomainEvent";
import { CoursePriceUpdatedDomainEvent } from "./events/CoursePriceUpdatedDomainEvent";
import { CoursePublishedDomainEvent } from "./events/CoursePublishedDomainEvent";

export type CoursePrimitives = {
    id: string;
    name: string;
    abstract: string;
    instructor: CourseInstructorPrimitives;
    picture: string;
    location: string;
    duration: CourseDurationPrimitives;
    price: number;
    creation: string;
    lastUpdate: string;
};

export class Course extends AggregateRoot {
    constructor(
        private readonly id: CourseId,
        private name: CourseName,
        private abstract: CourseAbstract,
        private picture: CoursePicture,
        private readonly instructor: CourseInstructor,
        private location: CourseLocation,
        private readonly duration: CourseDuration,
        private price: CoursePrice,
        private readonly creation: CourseCreation,
        private readonly lastUpdate: CourseUpdate
    ) {
        super();
    }

    static create(
        id: string,
        name: string,
        abstract: string,
        picture: string,
        instructor: CourseInstructorPrimitives,
        location: string,
        duration: CourseDurationPrimitives,
        price: number
    ): Course {
        const defaultCreationDate = new Date();
        const defaultLastUpdateDate = new Date();
        const course = new Course(
            new CourseId(id),
            new CourseName(name),
            new CourseAbstract(abstract),
            new CoursePicture(picture),
            CourseInstructor.fromPrimitives(instructor),
            new CourseLocation(location),
            CourseDuration.fromPrimitives(duration),
            new CoursePrice(price),
            new CourseCreation(defaultCreationDate),
            new CourseUpdate(defaultLastUpdateDate)
        );

        course.record(
            new CoursePublishedDomainEvent(
                id,
                name,
                abstract,
                picture,
                instructor,
                location,
                duration,
                price,
                defaultCreationDate.toISOString(),
                defaultLastUpdateDate.toISOString()
            )
        );

        return course;
    }

    static fromPrimitives(primitives: CoursePrimitives): Course {
        return new Course(
            new CourseId(primitives.id),
            new CourseName(primitives.name),
            new CourseAbstract(primitives.abstract),
            new CoursePicture(primitives.picture),
            CourseInstructor.fromPrimitives(primitives.instructor),
            new CourseLocation(primitives.location),
            CourseDuration.fromPrimitives(primitives.duration),
            new CoursePrice(primitives.price),
            new CourseCreation(new Date(primitives.creation)),
            new CourseUpdate(new Date(primitives.lastUpdate))
        );
    }

    toPrimitives(): CoursePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            abstract: this.abstract.value,
            instructor: this.instructor.toPrimitives(),
            picture: this.picture.value,
            location: this.location.value,
            duration: this.duration.toPrimitives(),
            price: this.price.value,
            creation: this.creation.value.toISOString(),
            lastUpdate: this.lastUpdate.value.toISOString()
        };
    }

    updateName(name: string): void {
        this.name = new CourseName(name);
        this.record(new CourseNameUpdatedDomainEvent(this.id.value, name));
    }

    updateAbstract(abstract: string): void {
        this.abstract = new CourseAbstract(abstract);
        this.record(new CourseAbstractUpdatedDomainEvent(this.id.value, abstract));
    }

    updatePicture(picture: string): void {
        this.picture = new CoursePicture(picture);
        this.record(new CoursePictureUpdatedDomainEvent(this.id.value, picture));
    }

    updateLocation(location: string): void {
        this.location = new CourseLocation(location);
        this.record(new CourseLocationUpdatedDomainEvent(this.id.value, location));
    }

    updatePrice(price: number): void {
        this.price = new CoursePrice(price);
        this.record(new CoursePriceUpdatedDomainEvent(this.id.value, price));
    }
}
