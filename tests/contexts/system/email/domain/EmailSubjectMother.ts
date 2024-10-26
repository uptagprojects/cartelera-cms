import { faker } from "@faker-js/faker";

import { EmailSubject } from "../../../../../src/contexts/system/email/domain/EmailSubject";

export class EmailSubjectMother {
	static create(value?: string): EmailSubject {
		return new EmailSubject(value ?? faker.string.alpha());
	}
}
