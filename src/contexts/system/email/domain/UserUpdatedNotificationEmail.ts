import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailBody } from "./EmailBody/EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { UserUpdatedNotificationEmailSentDomainEvent } from "./event/UserUpdatedNotificationEmailSentDomainEvent";

export type UserUpdatedNotificationEmailPrimitives = {
	id: string;
	userId: string;
	userName: string;
	propertyUpdated: string;
	from: string;
	to: string;
	subject: string;
	body: string;
};

export class UserUpdatedNotificationEmail extends Email {
	private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>";

	private constructor(
		id: EmailId,
		from: EmailAddress,
		to: EmailAddress,
		subject: EmailSubject,
		body: EmailBody,
		private readonly userId: UserId,
		private readonly userName: string,
		private readonly propertyUpdated: string
	) {
		super(id, from, to, subject, body);
	}

	static send(
		id: string,
		userId: string,
		name: string,
		propertyUpdated: string,
		emailAddress: string
	): UserUpdatedNotificationEmail {
		const from = new EmailAddress(UserUpdatedNotificationEmail.from);
		const subject = UserUpdatedNotificationEmail.generateSubject(name, propertyUpdated);
		const body = UserUpdatedNotificationEmail.generateBody(name, propertyUpdated);

		const email = new UserUpdatedNotificationEmail(
			new EmailId(id),
			from,
			new EmailAddress(emailAddress),
			subject,
			body,
			new UserId(userId),
			name,
			propertyUpdated
		);

		email.record(
			new UserUpdatedNotificationEmailSentDomainEvent(
				id,
				userId,
				name,
				propertyUpdated,
				from.value,
				emailAddress,
				subject.value,
				body.value
			)
		);

		return email;
	}

	static fromPrimitives(
		primitives: UserUpdatedNotificationEmailPrimitives
	): UserUpdatedNotificationEmail {
		return new UserUpdatedNotificationEmail(
			new EmailId(primitives.id),
			new EmailAddress(primitives.from),
			new EmailAddress(primitives.to),
			new EmailSubject(primitives.subject),
			new EmailBody(primitives.body),
			new UserId(primitives.userId),
			primitives.userName,
			primitives.propertyUpdated
		);
	}

	private static generateSubject(userName: string, propertyChanged: string): EmailSubject {
		return new EmailSubject(`${userName}, tu ${propertyChanged} se ha cambiado`);
	}

	private static generateBody(userName: string, propertyChanged: string): EmailBody {
		return new EmailBody(
			`Hola, ${userName}\nHemos cambiado tu ${propertyChanged} correctamente. Si no fuiste tú, por favor, contacta a soporte técnico lo antes posible.`
		);
	}

	toPrimitives(): UserUpdatedNotificationEmailPrimitives {
		return {
			id: this.id.value,
			userId: this.userId.value,
			userName: this.userName,
			propertyUpdated: this.propertyUpdated,
			from: this.from.value,
			to: this.to.value,
			subject: this.subject.value,
			body: this.body.value
		};
	}
}
