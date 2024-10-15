import { Attachment } from "../../attachments/domain/Attachment";
import { GuideContent } from "./GuideContent";
import { GuideId } from "./GuideId";
import { GuideTitle } from "./GuideTitle";
import { ProfessorId } from "./ProfessorId"
import { GuidePublishDate } from "./GuidePublishDate";

export class Guide {
    readonly id: GuideId;
    readonly title: GuideTitle;
    readonly content: GuideContent;
    readonly professorId: ProfessorId;
    readonly publishDate: GuidePublishDate;
    readonly attachements: Attachment[];

    constructor(id: GuideId, title: GuideTitle, content: GuideContent, professorId: ProfessorId, publishDate: GuidePublishDate, attachements: Attachment[],) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.professorId = professorId;
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