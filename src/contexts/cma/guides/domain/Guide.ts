import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UCId } from "../../uc/domain/UCId";
import { UserId } from "../../users/domain/UserId";
import { GuideContent } from "./GuideContent";
import { GuideId } from "./GuideId";
import { GuideStatus } from "./GuideStatus";
import { GuideTitle } from "./GuideTitle";
import { GuideArchivedDomainEvent } from "./event/GuideArchivedDomainEvent";
import { GuideContentUpdatedDomainEvent } from "./event/GuideContentUpdatedDomainEvent";
import { GuidePostedDomainEvent } from "./event/GuidePostedDomainEvent";
import { GuidePublishedDomainEvent } from "./event/GuidePublishedDomainEvent";
import { GuideTitleUpdatedDomainEvent } from "./event/GuideTitleUpdatedDomainEvent";

export interface GuidePrimitives {
    id: string;
    title: string;
    content: string;
    areaId: string;
    authorId: string;
    status: string;
}

export class Guide extends AggregateRoot {
    constructor(
        private readonly id: GuideId,
        private title: GuideTitle,
        private content: GuideContent,
        private readonly areaId: UCId,
        private readonly authorId: UserId,
        private status: GuideStatus
    ) {
        super();
    }

    static create(id: string, title: string, content: string, areaId: string, authorId: string): Guide {
        const defaultGuideStatus = GuideStatus.DRAFT;

        const guide = new Guide(
            new GuideId(id),
            new GuideTitle(title),
            new GuideContent(content),
            new UCId(areaId),
            new UserId(authorId),
            defaultGuideStatus
        );

        guide.record(new GuidePostedDomainEvent(id, title, content, areaId, authorId, defaultGuideStatus));
        return guide;
    }

    static fromPrimitives(primitives: GuidePrimitives): Guide {
        return new Guide(
            new GuideId(primitives.id),
            new GuideTitle(primitives.title),
            new GuideContent(primitives.content),
            new UCId(primitives.areaId),
            new UserId(primitives.authorId),
            primitives.status as GuideStatus
        );
    }

    toPrimitives(): GuidePrimitives {
        return {
            id: this.id.value,
            title: this.title.value,
            content: this.content.value,
            areaId: this.areaId.value,
            authorId: this.authorId.value,
            status: this.status
        }
    }

    archive(): void {
		this.status = GuideStatus.ARCHIVED;
		this.record(new GuideArchivedDomainEvent(this.id.value));
	}

    publish(): void {
        this.status = GuideStatus.PUBLISHED;
        this.record(new GuidePublishedDomainEvent(this.id.value));
    }

    updateTitle(title: string): void {
        this.title = new GuideTitle(title);
        this.record(new GuideTitleUpdatedDomainEvent(this.id.value, title));
    }

    updateContent(content: string): void {
        this.content = new GuideContent(content);
        this.record(new GuideContentUpdatedDomainEvent(this.id.value, content));
    }
}