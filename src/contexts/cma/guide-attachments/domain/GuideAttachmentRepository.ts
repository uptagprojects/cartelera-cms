import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachment } from "./GuideAttachment";
import { GuideAttachmentId } from "./GuideAttachmentId";

export interface GuideAttachmentRepository {
	save(guideAttachment: GuideAttachment): Promise<void>;

	search(id: GuideAttachmentId): Promise<GuideAttachment | null>;

	searchAllByGuideId(guideId: GuideId): Promise<GuideAttachment[]>;

	remove(id: GuideAttachmentId): Promise<void>;
}
