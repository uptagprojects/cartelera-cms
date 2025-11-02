import { GuideAttachmentsByGuideSearcher } from "../../../../../../src/contexts/cma/guide-attachments/application/search-all-by-schedule/GuideAttachmentsByGuideSearcher";
import { GuideIdMother } from "../../../guides/domain/GuideIdMother";
import { GuideAttachmentMother } from "../../domain/GuideAttachmentMother";
import { MockGuideAttachmentRepository } from "../../infrastructure/MockGuideAttachmentRepository";

describe("GuideAttachmentsByGuideSearcher should", () => {
    const repository = new MockGuideAttachmentRepository();
    const guideAttachmentsByGuideSearcher = new GuideAttachmentsByGuideSearcher(repository);

    it("search guide attachments by guide id", async () => {
        const guideId = GuideIdMother.create();
        const expectedAttachments = [
            GuideAttachmentMother.create({ guideId: guideId.value }),
            GuideAttachmentMother.create({ guideId: guideId.value })
        ];

        repository.shouldSearchAllByGuideId(expectedAttachments);

        const attachments = await guideAttachmentsByGuideSearcher.search(guideId.value);

        expect(attachments).toHaveLength(2);
    });
});
