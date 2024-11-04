import { Service } from "diod";
import { GuideRepository } from "../../domain/GuideRepository";
import { UserFinder } from "../../../../cma/users/domain/UserFinder";
import { GuideId } from "../../domain/GuideId";
import { UCFinder } from "../../../uc/domain/UCFinder";
import { Guide } from "../../domain/Guide";
import { MarkdownRemover } from "../../../../shared/domain/MarkdownRemover";
import { GUIDE_CONTENT_WRAPPED_MAX_LENGTH } from "../../domain/GuideContentWrapped";
import { GuideAttachmentFinder } from "../../../../cma/guide-attachments/domain/GuideAttachmentFinder";

@Service()
export class PublishedGuideUpdater {
    constructor(
        private readonly repository: GuideRepository,
        private readonly ucFinder: UCFinder,
        private readonly attachmentFinder: GuideAttachmentFinder,
        private readonly userFinder: UserFinder,
        private readonly mdRemover: MarkdownRemover
    ) {}

    async update(
        id: string,
        title: string,
        ucId: string,
        content: string,
        authorId: string,
        occurredOn: Date,
    ): Promise<void> {
        let guide = await this.repository.search(new GuideId(id));
        const uc = (await this.ucFinder.find(ucId)).toPrimitives();
        const attachments = (await this.attachmentFinder.searchAllByGuideId(id)).map((attachment) => attachment.toPrimitives().url);
        
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
                    avatar: author.avatar,
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