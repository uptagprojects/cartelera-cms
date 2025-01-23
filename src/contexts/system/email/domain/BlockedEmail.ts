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

export class BlockedEmail extends Email {
	private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>";

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

	static send(id: string, userId: string, name: string, emailAddress: string): BlockedEmail {
		const from = new EmailAddress(BlockedEmail.from);
		const subject = BlockedEmail.generateSubject(name);
		const html = BlockedEmail.generateHTML(name);
		const text = BlockedEmail.generateText(name);

		const email = new BlockedEmail(
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

	static fromPrimitives(primitives: BlockedEmailPrimitives): BlockedEmail {
		return new BlockedEmail(
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
		return new EmailSubject(`Has sido bloqueado del PNFi, ${userName}`);
	}

	private static generateHTML(userName: string): EmailHTMLBody {
		return new EmailHTMLBody(
			`<p>Hola ${userName},</p><p>Has sido bloqueado del PNFi. Si crees que esto es un error, por favor contacta a soporte.</p><p>Saludos,<br>El equipo de PNFi</p>`
		);
	}

	private static generateText(userName: string): EmailTextBody {
		return new EmailTextBody(
			`Hola ${userName},\n\nHas sido bloqueado del PNFi. pa Si crees que esto es un error, por favor contacta a soporte.\n\nSaludos,\nEl equipo de PNFi`
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
