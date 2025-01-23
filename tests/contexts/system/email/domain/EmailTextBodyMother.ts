import { faker } from "@faker-js/faker";

import { EmailTextBody } from "../../../../../src/contexts/system/email/domain/EmailTextBody";

export class EmailTextBodyMother {
	static create(value?: string): EmailTextBody {
		return new EmailTextBody(value ?? faker.lorem.paragraphs(3));
	}
}
