import { WelcomeEmailSentDomainEvent } from "../../../../../../src/contexts/system/email/domain/event/WelcomeEmailSentDomainEvent";
import { WelcomeEmailPrimitives } from "../../../../../../src/contexts/system/email/domain/WelcomeEmail";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { EmailHTMLBodyMother } from "../EmailHTMLBodyMother";
import { EmailIdMother } from "../EmailIdMother";
import { EmailSubjectMother } from "../EmailSubjectMother";
import { EmailTextBodyMother } from "../EmailTextBodyMother";

export class WelcomeEmailSentDomainEventMother {
	static create(params?: Partial<WelcomeEmailPrimitives>): WelcomeEmailSentDomainEvent {
		const primitives: WelcomeEmailPrimitives = {
			id: EmailIdMother.create().value,
			from: EmailAddressMother.create().value,
			to: EmailAddressMother.create().value,
			subject: EmailSubjectMother.create().value,
			html: EmailHTMLBodyMother.create().value,
			text: EmailTextBodyMother.create().value,
			...params
		};

		return new WelcomeEmailSentDomainEvent(
			primitives.id,
			primitives.from,
			primitives.to,
			primitives.subject,
			primitives.html,
			primitives.text
		);
	}
}
