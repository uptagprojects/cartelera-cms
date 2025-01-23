import { ArchivedEmailSentDomainEvent } from "../../../../../../src/contexts/system/email/domain/event/ArchivedEmailSentDomainEvent";
import { ArchivedEmailPrimitives } from "../../../../../../src/contexts/system/email/domain/ArchivedEmail";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { EmailBodyMother } from "../EmailHTMLBodyMother";
import { EmailIdMother } from "../EmailIdMother";
import { EmailSubjectMother } from "../EmailSubjectMother";

export class ArchivedEmailSentDomainEventMother {
	static create(params?: Partial<ArchivedEmailPrimitives>): ArchivedEmailSentDomainEvent {
		const primitives: ArchivedEmailPrimitives = {
			id: EmailIdMother.create().value,
			userId: UserIdMother.create().value,
			userName: UserNameMother.create().value,
			from: EmailAddressMother.create().value,
			to: EmailAddressMother.create().value,
			subject: EmailSubjectMother.create().value,
			body: EmailBodyMother.create().value,
			...params
		};

		return new ArchivedEmailSentDomainEvent(
			primitives.id,
			primitives.userId,
			primitives.userName,
			primitives.from,
			primitives.to,
			primitives.subject,
			primitives.body
		);
	}
}
