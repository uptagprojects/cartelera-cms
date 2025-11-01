import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachment } from "./GuideAttachment";
import { GuideAttachmentId } from "./GuideAttachmentId";

export abstract class GuideAttachmentRepository {
    abstract save(guideAttachment: GuideAttachment): Promise<void>;

    abstract search(id: GuideAttachmentId): Promise<GuideAttachment | null>;

    abstract searchAllByGuideId(guideId: GuideId): Promise<GuideAttachment[]>;

    abstract remove(guideAttachment: GuideAttachment): Promise<void>;
}
