import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailBody } from "./EmailBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { WelcomeEmailSentDomainEvent } from "./event/WelcomeEmailSentDomainEvent";

export type WelcomeEmailPrimitives = {
	id: string;
	userId: string;
	userName: string;
	from: string;
	to: string;
	subject: string;
	body: string;
};

export class WelcomeEmail extends Email {
	private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <no-reply@pnfi.pro>";

	private constructor(
		id: EmailId,
		from: EmailAddress,
		to: EmailAddress,
		subject: EmailSubject,
		body: EmailBody,
		private readonly userId: UserId,
		private readonly userName: string
	) {
		super(id, from, to, subject, body);
	}

	static send(id: string, userId: string, name: string, emailAddress: string): WelcomeEmail {
		const from = new EmailAddress(WelcomeEmail.from);
		const subject = WelcomeEmail.generateSubject(name);
		const body = WelcomeEmail.generateBody(userId, name);

		const email = new WelcomeEmail(
			new EmailId(id),
			from,
			new EmailAddress(emailAddress),
			subject,
			body,
			new UserId(userId),
			name
		);

		email.record(
			new WelcomeEmailSentDomainEvent(
				id,
				userId,
				name,
				from.value,
				emailAddress,
				subject.value,
				body.value
			)
		);

		return email;
	}

	static fromPrimitives(primitives: WelcomeEmailPrimitives): WelcomeEmail {
		return new WelcomeEmail(
			new EmailId(primitives.id),
			new EmailAddress(primitives.from),
			new EmailAddress(primitives.to),
			new EmailSubject(primitives.subject),
			new EmailBody(primitives.body),
			new UserId(primitives.userId),
			primitives.userName
		);
	}

	private static generateSubject(userName: string): EmailSubject {
		return new EmailSubject(`Bienvenido al PNFi, ${userName}`);
	}

	private static generateBody(id: string, userName: string): EmailBody {
		return new EmailBody(
			`Bienvenido a la cartelera del PNFi, ${userName}! Completa tu registro utilizando el enlace de invitacion:\nhttps://octagon.uptag.net/confirm?id=${id}`
		);
	}

	toPrimitives(): WelcomeEmailPrimitives {
		return {
			id: this.id.value,
			userId: this.userId.value,
			userName: this.userName,
			from: this.from.value,
			to: this.to.value,
			subject: this.subject.value,
			body: this.body.value
		};
	}
}
