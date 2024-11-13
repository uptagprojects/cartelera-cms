import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailBody } from "./EmailBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { WelcomeEmailSentDomainEvent } from "./event/WelcomeEmailSentDomainEvent";

export type ArchivedEmailPrimitives = {
	id: string;
	userId: string;
	userName: string;
	from: string;
	to: string;
	subject: string;
	body: string;
};

export class ArchivedEmail extends Email {
	private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "noreply@octagon.uptag.net";

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

	static send(id: string, userId: string, name: string, emailAddress: string): ArchivedEmail {
		const from = new EmailAddress(ArchivedEmail.from);
		const subject = ArchivedEmail.generateSubject(name);
		const body = ArchivedEmail.generateBody(name);

		const email = new ArchivedEmail(
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

	static fromPrimitives(primitives: ArchivedEmailPrimitives): ArchivedEmail {
		return new ArchivedEmail(
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
		return new EmailSubject(`Esperamos volver a verte, ${userName}`);
	}

	private static generateBody(userName: string): EmailBody {
		return new EmailBody(
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
			body: this.body.value
		};
	}
}
