import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailHTMLBody } from "./EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { EmailTextBody } from "./EmailTextBody";
import { WelcomeEmailSentDomainEvent } from "./event/WelcomeEmailSentDomainEvent";

export type BlockedEmailPrimitives = {
	id: string;
	userId: string;
	userName: string;
	from: string;
	to: string;
	subject: string;
	html: string;
	text: string;
};

export class RestoredEmail extends Email {
	private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "octagon@pnfi.pro";

	private constructor(
		id: EmailId,
		from: EmailAddress,
		to: EmailAddress,
		subject: EmailSubject,
		html: EmailHTMLBody,
		text: EmailTextBody,
		private readonly userId: UserId,
		private readonly userName: string
	) {
		super(id, from, to, subject, html, text);
	}

	static send(id: string, userId: string, name: string, emailAddress: string): RestoredEmail {
		const from = new EmailAddress(RestoredEmail.from);
		const subject = RestoredEmail.generateSubject(name);
		const html = RestoredEmail.generateHTML(name);
		const text = RestoredEmail.generateText(name);

		const email = new RestoredEmail(
			new EmailId(id),
			from,
			new EmailAddress(emailAddress),
			subject,
			html,
			text,
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
				html.value,
				text.value
			)
		);

		return email;
	}

	static fromPrimitives(primitives: BlockedEmailPrimitives): RestoredEmail {
		return new RestoredEmail(
			new EmailId(primitives.id),
			new EmailAddress(primitives.from),
			new EmailAddress(primitives.to),
			new EmailSubject(primitives.subject),
			new EmailHTMLBody(primitives.html),
			new EmailTextBody(primitives.text),
			new UserId(primitives.userId),
			primitives.userName
		);
	}

	private static generateSubject(userName: string): EmailSubject {
		return new EmailSubject(`Bienvenido de vuelta, ${userName}`);
	}

	private static generateHTML(userName: string): EmailHTMLBody {
		return new EmailHTMLBody(
			`<p>Bienvenido de vuelta, ${userName}.</p><p>Tu acceso al PNFi ha sido restaurado. Si tienes alguna pregunta, no dudes en contactarnos.</p>`
		);
	}

	private static generateText(userName: string): EmailTextBody {
		return new EmailTextBody(
			`Bienvenido de vuelta, ${userName}.\n\nTu acceso al PNFi ha sido restaurado. Si tienes alguna pregunta, no dudes en contactarnos.`
		);
	}

	toPrimitives(): BlockedEmailPrimitives {
		return {
			id: this.id.value,
			userId: this.userId.value,
			userName: this.userName,
			from: this.from.value,
			to: this.to.value,
			subject: this.subject.value,
			html: this.html.value,
			text: this.text.value
		};
	}
}
