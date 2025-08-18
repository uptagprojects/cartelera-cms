import { Announcement } from "../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementContent } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementContent";
import { AnnouncementId } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementId";
import { AnnouncementPublishDate } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementPublishDate";
import { AnnouncementStatus } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementTitle } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementTitle";
import { AnnouncementType } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementType";
import { AnnouncementContentMother } from "./AnnouncementContentMother";
import { AnnouncementIdMother } from "./AnnouncementIdMother";
import { AnnouncementPublishDateMother } from "./AnnouncementPublishDateMother";
import { AnnouncementStatusMother } from "./AnnouncementStatusMother";
import { AnnouncementTitleMother } from "./AnnouncementTitleMother";
import { AnnouncementTypeMother } from "./AnnouncementTypeMother";
import { AnnouncementPrimitives } from "../../../../../src/contexts/cma/announcements/domain/Announcement";

export class AnnouncementMother {
    static create(params?: Partial<AnnouncementPrimitives>): Announcement {
        const primitives: AnnouncementPrimitives = {
            id: AnnouncementIdMother.create().value,
            title: AnnouncementTitleMother.create().value,
            content: AnnouncementContentMother.create().value,
            publishDate: AnnouncementPublishDateMother.create().value.toISOString(),
            type: AnnouncementTypeMother.create(),
            status: AnnouncementStatusMother.create(),
            ...params
        };
        return Announcement.fromPrimitives(primitives);
    }
}
