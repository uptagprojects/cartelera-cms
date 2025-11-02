import { GuideAttachmentRemover } from "../../../../../../src/contexts/cma/guide-attachments/application/remove/GuideAttachmentRemover";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockFileStorage } from "../../../../shared/infrastructure/MockFileStorage";
import { GuideAttachmentMother } from "../../domain/GuideAttachmentMother";
import { MockGuideAttachmentRepository } from "../../infrastructure/MockGuideAttachmentRepository";

describe("GuideAttachmentRemover should", () => {
    const repository = new MockGuideAttachmentRepository();
    const fileStorage = new MockFileStorage();
    const eventBus = new MockEventBus();
    const guideAttachmentRemover = new GuideAttachmentRemover(repository, fileStorage, eventBus);

    it("remove an existing guide attachment", async () => {
        const attachment = GuideAttachmentMother.create();

        repository.shouldSearch(attachment);
        fileStorage.shouldRemove();
        repository.shouldRemove();
        eventBus.shouldPublish([]);

        await guideAttachmentRemover.remove(attachment.toPrimitives().id);
    });
});
