import { UserUpdatedNotificationEmailSentDomainEvent } from "../../../../../../src/contexts/system/email/domain/event/UserUpdatedNotificationEmailSentDomainEvent";
import { UserUpdatedNotificationEmailPrimitives } from "../../../../../../src/contexts/system/email/domain/UserUpdatedNotificationEmail";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { EmailBodyMother } from "../EmailBodyMother";
import { EmailIdMother } from "../EmailIdMother";
import { EmailSubjectMother } from "../EmailSubjectMother";

export class UserUpdatedNotificationEmailSentDomainEventMother {
	static create(params?: Partial<UserUpdatedNotificationEmailPrimitives>): UserUpdatedNotificationEmailSentDomainEvent {
		const primitives: UserUpdatedNotificationEmailPrimitives = {
			id: EmailIdMother.create().value,
			userId: UserIdMother.create().value,
			userName: UserNameMother.create().value,
			propertyUpdated: "email",
			from: EmailAddressMother.create().value,
			to: EmailAddressMother.create().value,
			subject: EmailSubjectMother.create().value,
			body: EmailBodyMother.create().value,
			...params
		};

		return new UserUpdatedNotificationEmailSentDomainEvent(
			primitives.id,
			primitives.userId,
			primitives.userName,
			primitives.propertyUpdated,
			primitives.from,
			primitives.to,
			primitives.subject,
			primitives.body
		);
	}
}
