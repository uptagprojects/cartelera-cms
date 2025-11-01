import { faker } from "@faker-js/faker";

import {
	GuideAttachment,
	GuideAttachmentPrimitives
} from "../../../../../src/contexts/cma/guide-attachments/domain/GuideAttachment";
import { GuideIdMother } from "../../guides/domain/GuideIdMother";
import { GuideAttachmentIdMother } from "./GuideAttachmentIdMother";

export class GuideAttachmentMother {
	static create(params?: Partial<GuideAttachmentPrimitives>): GuideAttachment {
		const primitives: GuideAttachmentPrimitives = {
			id: GuideAttachmentIdMother.create().value,
			name: faker.system.fileName(),
			guideId: GuideIdMother.create().value,
			url: faker.internet.url(),
			size: faker.number.int({ min: 1000, max: 10000000 }),
			mimeType: faker.system.mimeType(),
			storagePath: `/guide-attachments/${faker.string.uuid()}.pdf`,
			...params
		};

		return GuideAttachment.fromPrimitives(primitives);
	}
}
