import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailBody } from "./EmailBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { WelcomeEmailSentDomainEvent } from "./event/WelcomeEmailSentDomainEvent";

export type BlockedEmailPrimitives = {
	id: string;
	userId: string;
	userName: string;
	from: string;
	to: string;
	subject: string;
	body: string;
};

export class BlockedEmail extends Email {
	private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>";

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

	static send(id: string, userId: string, name: string, emailAddress: string): BlockedEmail {
		const from = new EmailAddress(BlockedEmail.from);
		const subject = BlockedEmail.generateSubject(name);
		const body = BlockedEmail.generateBody(name);

		const email = new BlockedEmail(
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

	static fromPrimitives(primitives: BlockedEmailPrimitives): BlockedEmail {
		return new BlockedEmail(
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
		return new EmailSubject(`Has sido bloqueado del PNFi, ${userName}`);
	}

	private static generateBody(userName: string): EmailBody {
		return new EmailBody(
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
			body: this.body.value
		};
	}
}
