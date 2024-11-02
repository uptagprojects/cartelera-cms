import { Service } from "diod";

import { GuideFinder } from "../../../../cma/guides/domain/GuideFinder";
import { MarkdownRemover } from "../../../../shared/domain/MarkdownRemover";
import { GUIDE_CONTENT_WRAPPED_MAX_LENGTH } from "../../domain/GuideContentWrapped";
import { GuideRepository } from "../../domain/GuideRepository";
import { UserFinder } from "../../../../cma/users/domain/UserFinder";
import { UCFinder } from "../../../uc/domain/UCFinder";
import { Guide } from "../../domain/Guide";

@Service()
export class GuidePoster {
	constructor(
		private readonly repository: GuideRepository,
		private readonly guideFinder: GuideFinder,
        private readonly userFinder: UserFinder,
        private readonly ucFinder: UCFinder,
        private readonly attachmentFinder: AttachmentFinder,
		private readonly markdownRemover: MarkdownRemover
	) {}

	async post(id: string, occurredOn: Date): void {
		const guide = await this.guideFinder.find(id);
		const guidePrimitives = guide.toPrimitives();
        const area = await this.ucFinder.find(guidePrimitives.ucId);
        const areaPrimitives = await area.toPrimitives();
        const author = await this.userFinder.find(guidePrimitives.authorId);
        const professor = author.toPrimitives();


		const cdaGuide = Guide.create(
			id,
			guidePrimitives.title,
			guidePrimitives.content,
			await this.markdownRemover.remove(
				guidePrimitives.content,
				GUIDE_CONTENT_WRAPPED_MAX_LENGTH
			),
			areaPrimitives.name,
			{
                id: professor.id,
                name: professor.name,
                avatar: professor.avatar
            },
			occurredOn,
            attachments
		);
		this.repository.save(guide);
	}
}
