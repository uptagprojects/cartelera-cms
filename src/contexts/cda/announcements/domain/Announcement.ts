import { Attachment } from "../../attachments/domain/Attachment";
import { AnnouncementAuthorId } from "./AnnouncementAuthorId";
import { AnnouncementContent } from "./AnnouncementContent";
import { AnnouncementId } from "./AnnouncementId";
import { AnnouncementPublishDate } from "./AnnouncementPublishDate";
import { AnnouncementTitle } from "./AnnouncementTitle";

export class Guide {
    readonly id: AnnouncementId;
    readonly title: AnnouncementTitle;
    readonly content: AnnouncementContent;
    readonly authorId: AnnouncementAuthorId;
    readonly publishDate: AnnouncementPublishDate;
    readonly attachements: Attachment[];

    constructor(id: AnnouncementId, title: AnnouncementTitle, content: AnnouncementContent, authorId: AnnouncementAuthorId, publishDate: AnnouncementPublishDate, attachements: Attachment[],) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.publishDate = publishDate;
        this.attachements = attachements;
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