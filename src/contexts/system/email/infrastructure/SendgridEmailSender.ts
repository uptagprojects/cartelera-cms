import sgMail from "@sendgrid/mail";
import { Service } from "diod";

import { Email } from "../domain/Email";
import { EmailSender } from "../domain/EmailSender";

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "SECRET");

@Service()
export class SendgridEmailSender implements EmailSender {
	async send<T extends Email>(_email: T): Promise<void> {
		const emailPrimitives = _email.toPrimitives();
		try {
			await sgMail.send({
				to: emailPrimitives.to,
				from: emailPrimitives.from,
				subject: emailPrimitives.subject,
				text: emailPrimitives.body
			});
		} catch (error: unknown) {
			// TO DO: Handle error and log it
			console.error(error);
		}
	}
}
