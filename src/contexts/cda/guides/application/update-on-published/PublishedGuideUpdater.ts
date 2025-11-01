import { Service } from "diod";

import { GuideAttachmentsByGuideSearcher } from "../../../../cma/guide-attachments/application/search-all-by-schedule/GuideAttachmentsByGuideSearcher";
import { UserFinder } from "../../../../cma/users/domain/UserFinder";
import { MarkdownRemover } from "../../../../shared/domain/MarkdownRemover";
import { UCFinder } from "../../../uc/domain/UCFinder";
import { Guide } from "../../domain/Guide";
import { GUIDE_CONTENT_WRAPPED_MAX_LENGTH } from "../../domain/GuideContentWrapped";
import { GuideId } from "../../domain/GuideId";
import { GuideRepository } from "../../domain/GuideRepository";

@Service()
export class PublishedGuideUpdater {
    constructor(
        private readonly repository: GuideRepository,
        private readonly ucFinder: UCFinder,
        private readonly attachmentSearcher: GuideAttachmentsByGuideSearcher,
        private readonly userFinder: UserFinder,
        private readonly mdRemover: MarkdownRemover
    ) {}

    async update(
        id: string,
        title: string,
        content: string,
        ucId: string,
        authorId: string,
        occurredOn: Date
    ): Promise<void> {
        let guide = await this.repository.search(new GuideId(id));
        const uc = (await this.ucFinder.find(ucId)).toPrimitives();
        const attachments = (await this.attachmentSearcher.search(id)).map(attachment => attachment.toPrimitives().url);

        if (!guide) {
            const author = (await this.userFinder.find(authorId)).toPrimitives();

            guide = Guide.create(
                id,
                title,
                content,
                await this.mdRemover.remove(content, GUIDE_CONTENT_WRAPPED_MAX_LENGTH),
                uc.name,
                {
                    id: author.id,
                    name: author.name,
                    avatar: author.avatar
                },
                occurredOn.toISOString(),
                attachments
            );
        } else {
            guide.updateTitle(title);
            guide.updateContent(content);
            guide.updateContentWrapped(await this.mdRemover.remove(content, GUIDE_CONTENT_WRAPPED_MAX_LENGTH));
            guide.updateArea(uc.name);
            guide.updateAttachments(attachments);
        }

        await this.repository.save(guide);
    }
}
