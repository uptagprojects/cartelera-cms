import { Service } from "diod";
import Mailjet from "node-mailjet";

import { logger } from "../../../shared/infrastructure/telemetry/telemetry";
import { Email } from "../domain/Email";
import { EmailSender } from "../domain/EmailSender";

@Service()
export class MailjetEmailSender implements EmailSender {
	private readonly client = new Mailjet({
		apiKey: process.env.MJ_APIKEY_PUBLIC ?? "mailjet-api-key",
		apiSecret: process.env.MJ_APIKEY_PRIVATE ?? "mailjet-api-secret"
	});

	async send<T extends Email>(_email: T): Promise<void> {
		const emailPrimitives = _email.toPrimitives();
		try {
			await this.client.post("send", { version: "v3.1" }).request({
				Messages: [
					{
						From: {
							Email: emailPrimitives.from
						},
						To: [
							{
								Email: emailPrimitives.to
							}
						],
						Subject: emailPrimitives.subject,
						TextPart: emailPrimitives.text,
						HTMLPart: emailPrimitives.html
					}
				]
			});
		} catch (error: unknown) {
			logger.error("Error sending email via Mailjet", error);
		}
	}
}
