import {
    Announcement,
    AnnouncementPrimitives
} from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementRestoredDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementRestoredDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementRestoredDomainEventMother {
    static create(params?: Partial<AnnouncementPrimitives>): AnnouncementRestoredDomainEvent {
        const primitives = AnnouncementMother.create(params).toPrimitives();

        return new AnnouncementRestoredDomainEvent(primitives.id);
    }
}
