import { CdaAnnouncementContent } from "./CdaAnnouncementContent";
import { CdaAnnouncementId } from "./CdaAnnouncementId";
import { CdaAnnouncementTitle } from "./CdaAnnouncementTitle";
import { CdaAnnouncementType } from "./CdaAnnouncementType";

export interface CdaAnnouncementPrimitives {
    id: string;
    title: string;
    content: string;
    type: string;
}

export class CdaAnnouncement {
    constructor(
        public readonly id: CdaAnnouncementId,
        private title: CdaAnnouncementTitle,
        private content: CdaAnnouncementContent,
        private readonly type: CdaAnnouncementType
    ) {}

    static create(id: string, title: string, content: string, type: string): CdaAnnouncement {
        return new CdaAnnouncement(
            new CdaAnnouncementId(id),
            new CdaAnnouncementTitle(title),
            new CdaAnnouncementContent(content),
            type as CdaAnnouncementType
        );
    }

    static fromPrimitives(plainData: CdaAnnouncementPrimitives): CdaAnnouncement {
        return new CdaAnnouncement(
            new CdaAnnouncementId(plainData.id),
            new CdaAnnouncementTitle(plainData.title),
            new CdaAnnouncementContent(plainData.content),
            plainData.type as CdaAnnouncementType
        );
    }

    toPrimitives(): CdaAnnouncementPrimitives {
        return {
            id: this.id.value,
            title: this.title.value,
            content: this.content.value,
            type: this.type
        };
    }

    updateTitle(title: string): void {
        this.title = new CdaAnnouncementTitle(title);
    }

    updateContent(content: string): void {
        this.content = new CdaAnnouncementContent(content);
    }
}
