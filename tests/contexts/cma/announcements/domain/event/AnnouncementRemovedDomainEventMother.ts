import {
    Announcement,
    AnnouncementPrimitives
} from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementRemovedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementRemovedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementRemovedDomainEventMother {
    static create(params?: Partial<AnnouncementPrimitives>): AnnouncementRemovedDomainEvent {
        const primitives = AnnouncementMother.create(params).toPrimitives();

        return new AnnouncementRemovedDomainEvent(primitives.id);
    }
}
