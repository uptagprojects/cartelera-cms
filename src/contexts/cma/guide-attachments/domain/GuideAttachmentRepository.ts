import { GuideAttachment } from "./GuideAttachment";

export interface GuideAttachmentRepository {
    save(guideAttachment: GuideAttachment): Promise<void>;

    search(id: string): Promise<GuideAttachment | null>;
}