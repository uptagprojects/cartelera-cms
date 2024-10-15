import { EventEndDate } from "./EventEndDate";
import { EventId } from "./EventId";
import { EventLocation } from "./EventLocation";
import { EventName } from "./EventName";
import { EventStartDate } from "./EventStartDate";

export class Course {
    readonly id: EventId;
    readonly name: EventName;
    readonly location: EventLocation;
    readonly startDate: EventStartDate;
    readonly endDate: EventEndDate;

    constructor(id: EventId, name: EventName, location: EventLocation, startDate: EventStartDate, endDate: EventEndDate,) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    //   static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
    //     const course = new Course(id, name, duration);

    //     course.record(
    //       new CourseCreatedDomainEvent({
    //         aggregateId: course.id.value,
    //         duration: course.duration.value,
    //         name: course.name.value
    //       })
    //     );

    //     return course;
    //   }
    //   static fromPrimitives(plainData: { id: string; name: string; duration: string }): Course {
    //     return new Course(
    //       new CourseId(plainData.id),
    //       new CourseName(plainData.name),
    //       new CourseDuration(plainData.duration)
    //     );
    //   }

    //   toPrimitives(): any {
    //     return {
    //       id: this.id.value,
    //       name: this.name.value,
    //       duration: this.duration.value
    //     };
    //   }
}