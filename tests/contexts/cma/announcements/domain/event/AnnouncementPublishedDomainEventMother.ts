import {
    Announcement,
    AnnouncementPrimitives
} from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementPublishedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementPublishedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementPublishedDomainEventMother {
    static create(params?: Partial<AnnouncementPrimitives>): AnnouncementPublishedDomainEvent {
        const primitives = AnnouncementMother.create(params).toPrimitives();

        return new AnnouncementPublishedDomainEvent(
            primitives.id,
            primitives.title,
            primitives.content,
            primitives.publishDate,
            primitives.type
        );
    }
}
