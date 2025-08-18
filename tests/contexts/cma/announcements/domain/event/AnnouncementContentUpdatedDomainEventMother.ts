import {
    Announcement,
    AnnouncementPrimitives
} from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementContentUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementContentUpdatedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementContentUpdatedDomainEventMother {
    static create(params?: Partial<AnnouncementPrimitives>): AnnouncementContentUpdatedDomainEvent {
        const primitives = AnnouncementMother.create(params).toPrimitives();

        return new AnnouncementContentUpdatedDomainEvent(primitives.id, primitives.content);
    }
}
