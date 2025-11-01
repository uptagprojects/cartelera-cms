import { Service } from "diod";

import { CdaAnnouncementId } from "../../domain/CdaAnnouncementId";
import { CdaAnnouncementRepository } from "../../domain/CdaAnnouncementRepository";

@Service()
export class UnpublishedAnnouncementRemover {
    constructor(private readonly repository: CdaAnnouncementRepository) {}

    async remove(id: string): Promise<void> {
        const announcement = await this.repository.search(new CdaAnnouncementId(id));
        if (announcement) {
            await this.repository.remove(announcement);
        }
    }
}
