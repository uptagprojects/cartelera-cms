import { GuideAttachmentsByGuideSearcher } from "../../../../../src/contexts/cma/guide-attachments/application/search-all-by-schedule/GuideAttachmentsByGuideSearcher";
import { GuideAttachment } from "../../../../../src/contexts/cma/guide-attachments/domain/GuideAttachment";

export class MockGuideAttachmentsByGuideSearcher extends GuideAttachmentsByGuideSearcher {
	private mockSearch = jest.fn();

	constructor() {
		super(null as any);
	}

	async search(guideId: string): Promise<GuideAttachment[]> {
		return this.mockSearch() as Promise<GuideAttachment[]>;
	}

	shouldSearch(attachments: GuideAttachment[]): void {
		this.mockSearch.mockReturnValueOnce(attachments);
	}
}
