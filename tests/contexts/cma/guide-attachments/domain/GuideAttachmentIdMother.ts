import { faker } from "@faker-js/faker";

import { GuideAttachmentId } from "../../../../../src/contexts/cma/guide-attachments/domain/GuideAttachmentId";

export class GuideAttachmentIdMother {
	static create(value?: string): GuideAttachmentId {
		return new GuideAttachmentId(value ?? faker.string.uuid());
	}
}
