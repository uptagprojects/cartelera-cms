import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachment } from "./GuideAttachment";

export interface GuideAttachmentRepository {
	save(guideAttachment: GuideAttachment): Promise<void>;

	searchAllByGuideId(guideId: GuideId): Promise<GuideAttachment[]>;
}
