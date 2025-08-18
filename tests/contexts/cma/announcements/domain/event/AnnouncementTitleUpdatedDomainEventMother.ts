import {
    Announcement,
    AnnouncementPrimitives
} from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementTitleUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementTitleUpdatedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementTitleUpdatedDomainEventMother {
    static create(params?: Partial<AnnouncementPrimitives>): AnnouncementTitleUpdatedDomainEvent {
        const primitives = AnnouncementMother.create(params).toPrimitives();

        return new AnnouncementTitleUpdatedDomainEvent(primitives.id, primitives.title);
    }
}
