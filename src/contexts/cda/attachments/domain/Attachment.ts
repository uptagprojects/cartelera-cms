import { AttachmentId } from "./AttachementId";
import { AttachmentURL } from "./AttachmentURL";
import { SourceId } from "./SourceId";

export class Attachment {
    readonly id: AttachmentId;
    readonly sourceId: SourceId;
    readonly url: AttachmentURL;

    constructor(id: AttachmentId, sourceId: SourceId, url: AttachmentURL) {
        this.id = id;
        this.sourceId = sourceId;
        this.url = url;
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