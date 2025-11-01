import { Service } from "diod";
import { Resend } from "resend";

import { logger } from "../../../shared/infrastructure/telemetry/telemetry";
import { Email } from "../domain/Email";
import { EmailSender } from "../domain/EmailSender";

@Service()
export class ResendEmailSender implements EmailSender {
    private readonly client = new Resend(process.env.AUTH_RESEND_KEY ?? "resend-api-key");

    async send<T extends Email>(_email: T): Promise<void> {
        const emailPrimitives = _email.toPrimitives();
        try {
            await this.client.emails.send({
                from: emailPrimitives.from as string,
                to: [emailPrimitives.to as string],
                subject: emailPrimitives.subject as string,
                html: emailPrimitives.body as string
            });
        } catch (error: unknown) {
            logger.error("Error sending email via Resend", error);
        }
    }
}
