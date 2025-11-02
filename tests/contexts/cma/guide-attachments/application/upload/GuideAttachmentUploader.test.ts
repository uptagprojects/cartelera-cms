import { GuideAttachment } from "../../../../../../src/contexts/cma/guide-attachments/domain/GuideAttachment";
import { GuideAttachmentUploader } from "../../../../../../src/contexts/cma/guide-attachments/application/upload/GuideAttachmentUploader";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockFileStorage } from "../../../../shared/infrastructure/MockFileStorage";
import { GuideIdMother } from "../../../guides/domain/GuideIdMother";
import { GuideAttachmentIdMother } from "../../domain/GuideAttachmentIdMother";
import { MockGuideAttachmentRepository } from "../../infrastructure/MockGuideAttachmentRepository";

describe("GuideAttachmentUploader should", () => {
    const repository = new MockGuideAttachmentRepository();
    const fileStorage = new MockFileStorage();
    const eventBus = new MockEventBus();
    const guideAttachmentUploader = new GuideAttachmentUploader(repository, fileStorage, eventBus);

    it("upload a new guide attachment", async () => {
        const id = GuideAttachmentIdMother.create();
        const guideId = GuideIdMother.create();
        const file = new File(["test content"], "test.pdf", { type: "application/pdf" });
        const expectedUrl = "https://example.com/guide-attachments/test.pdf";

        // Mock Date to ensure consistent timestamps
        const fixedDate = new Date("2025-11-01T12:00:00.000Z");
        jest.spyOn(global, "Date").mockImplementation(() => fixedDate as any);

        // Create a dummy attachment to get the event with the right structure
        const dummyAttachment = GuideAttachment.create(
            id.value,
            file.name,
            guideId.value,
            expectedUrl,
            file.size,
            file.type,
            `/guide-attachments/${id.value}.pdf`
        );
        const expectedEvent = dummyAttachment.pullDomainEvents()[0];

        fileStorage.shouldSave(expectedUrl);
        repository.shouldSave();
        eventBus.shouldPublish([expectedEvent]);

        await guideAttachmentUploader.upload(id.value, guideId.value, file);

        // Restore Date
        jest.restoreAllMocks();
    });
});
