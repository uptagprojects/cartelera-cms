import { Attachment, AttachmentPrimitives } from '../../attachments/domain/Attachment';
import { GuideContent } from "./GuideContent";
import { GuideId } from "./GuideId";
import { GuideTitle } from "./GuideTitle";
import { ProfessorId } from './ProfessorId';
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

    static fromPrimitives(plainData: {
        id: string;
        title: string;
        content: string;
        professorId: string;
        publishDate: Date;
        attachments: AttachmentPrimitives[]
    }):
        Guide {
        return new Guide(
            new GuideId(plainData.id),
            new GuideTitle(plainData.title),
            new GuideContent(plainData.content),
            new ProfessorId(plainData.professorId),
            new GuidePublishDate(plainData.publishDate),
            plainData.attachments.map(v => Attachment.fromPrimitives(v))
        );
    }

    toPrimitives(): any {
        return {
            id: this.id.value,
            title: this.title.value,
            content: this.content.value,
            professorId: this.professorId.value,
            publishDate: this.publishDate.value.toString(),
            attachments: this.attachements
        };
    }
}