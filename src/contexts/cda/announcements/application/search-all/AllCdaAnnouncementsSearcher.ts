import { CdaAnnouncementPrimitives } from "../../domain/CdaAnnouncement";
import { CdaAnnouncementRepository } from "../../domain/CdaAnnouncementRepository";

export class AllCdaAnnouncementsSearcher {
    constructor(private readonly repository: CdaAnnouncementRepository) {}

    async searchAll(): Promise<CdaAnnouncementPrimitives[]> {
        return (await this.repository.searchAll()).map(a => a.toPrimitives());
    }
}
