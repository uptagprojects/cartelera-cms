import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailHTMLBody } from "./EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { EmailTextBody } from "./EmailTextBody";
import { ArchivedEmailSentDomainEvent } from "./event/ArchivedEmailSentDomainEvent";

export type ArchivedEmailPrimitives = {
	id: string;
	userId: string;
	userName: string;
	from: string;
	to: string;
	subject: string;
	html: string;
	text: string;
};

export class ArchivedEmail extends Email {
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

	static send(id: string, userId: string, name: string, emailAddress: string): ArchivedEmail {
		const from = new EmailAddress(ArchivedEmail.from);
		const subject = ArchivedEmail.generateSubject(name);
		const html = ArchivedEmail.generateHTML(name);
		const text = ArchivedEmail.generateText(name);

		const email = new ArchivedEmail(
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
			new ArchivedEmailSentDomainEvent(
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

	static fromPrimitives(primitives: ArchivedEmailPrimitives): ArchivedEmail {
		return new ArchivedEmail(
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
		return new EmailSubject(`Esperamos volver a verte, ${userName}`);
	}

	private static generateHTML(userName: string): EmailHTMLBody {
		return new EmailHTMLBody(
			`Hola, ${userName}\n\nTu usuario ha sido eliminado del PNFi. Si deseas volver a utilizar el servicio, por favor, ponte en contacto con nosotros.\n\nSaludos,\nEl equipo de PNFi`
		);
	}

	private static generateText(userName: string): EmailTextBody {
		return new EmailTextBody(
			`Hola, ${userName}\n\nTu usuario ha sido eliminado del PNFi. Si deseas volver a utilizar el servicio, por favor, ponte en contacto con nosotros.\n\nSaludos,\nEl equipo de PNFi`
		);
	}

	toPrimitives(): ArchivedEmailPrimitives {
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
