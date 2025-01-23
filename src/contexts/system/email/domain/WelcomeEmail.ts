import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailHTMLBody } from "./EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { EmailTextBody } from "./EmailTextBody";
import { WelcomeEmailSentDomainEvent } from "./event/WelcomeEmailSentDomainEvent";

export type WelcomeEmailPrimitives = {
	id: string;
	userId: string;
	userName: string;
	from: string;
	to: string;
	subject: string;
	html: string;
	text: string;
};

export class WelcomeEmail extends Email {
	private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>";
	private static readonly confirmationUrl = process.env.CONFIRMATION_URL ?? "https://pnfi.pro/";

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

	static send(id: string, userId: string, name: string, emailAddress: string): WelcomeEmail {
		const from = new EmailAddress(WelcomeEmail.from);
		const subject = WelcomeEmail.generateSubject(name);
		const html = WelcomeEmail.generateHTML(name);
		const text = WelcomeEmail.generateText(name);

		const email = new WelcomeEmail(
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

	static fromPrimitives(primitives: WelcomeEmailPrimitives): WelcomeEmail {
		return new WelcomeEmail(
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
		return new EmailSubject(`Bienvenido al PNFi, ${userName}`);
	}

	private static generateHTML(userName: string): EmailHTMLBody {
		return new EmailHTMLBody(
			`<html><h1>Bienvenido a la cartelera del PNFi, ${userName} 🎉</h1><p>Antes de proseguir, debes confirmar tu correo electrónico iniciando sesión en:<br/><a href="${this.confirmationUrl}">${this.confirmationUrl}</a></p>`
		);
	}

	private static generateText(userName: string): EmailTextBody {
		return new EmailTextBody(
			`Bienvenido a la cartelera del PNFi, ${userName} 🎉\nAntes de proseguir, debes confirmar tu correo electrónico iniciando sesión en:\n${this.confirmationUrl}`
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
			html: this.html.value,
			text: this.text.value
		};
	}
}
