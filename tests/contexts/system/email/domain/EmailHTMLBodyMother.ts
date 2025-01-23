import { faker } from "@faker-js/faker";

import { EmailHTMLBody } from "../../../../../src/contexts/system/email/domain/EmailHTMLBody";

export class EmailHTMLBodyMother {
	static create(value?: string): EmailHTMLBody {
		return new EmailHTMLBody(
			value ?? `<html><p>${faker.lorem.paragraphs(3, "</p><p>")}</p></html>`
		);
	}
}
