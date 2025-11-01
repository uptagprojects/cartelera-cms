import { GuideAttachment } from "../../../../../src/contexts/cma/guide-attachments/domain/GuideAttachment";
import { GuideAttachmentId } from "../../../../../src/contexts/cma/guide-attachments/domain/GuideAttachmentId";
import { GuideAttachmentRepository } from "../../../../../src/contexts/cma/guide-attachments/domain/GuideAttachmentRepository";
import { GuideId } from "../../../../../src/contexts/cma/guides/domain/GuideId";

export class MockGuideAttachmentRepository implements GuideAttachmentRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAllByGuideId = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(_guideAttachment: GuideAttachment): Promise<void> {
		this.mockSave();
	}

	async search(_id: GuideAttachmentId): Promise<GuideAttachment | null> {
		return this.mockSearch() as Promise<GuideAttachment | null>;
	}

	async searchAllByGuideId(_guideId: GuideId): Promise<GuideAttachment[]> {
		return this.mockSearchAllByGuideId() as Promise<GuideAttachment[]>;
	}

	async remove(_guideAttachment: GuideAttachment): Promise<void> {
		this.mockRemove();
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldSearch(guideAttachment: GuideAttachment): void {
		this.mockSearch.mockReturnValueOnce(guideAttachment);
	}

	shouldSearchAllByGuideId(guideAttachments: GuideAttachment[]): void {
		this.mockSearchAllByGuideId.mockReturnValueOnce(guideAttachments);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
