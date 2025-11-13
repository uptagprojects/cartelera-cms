import { UserUpdatedNotificationEmailSender } from "../../../../../../src/contexts/system/email/application/send-user-updated-notification-email/UserUpdatedNotificationEmailSender";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { UserUpdatedNotificationEmailMother } from "../../domain/UserUpdatedNotificationEmailMother";
import { UserUpdatedNotificationEmailSentDomainEventMother } from "../../domain/event/UserUpdatedNotificationEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("UserUpdatedNotificationEmailSender should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const sender = new UserUpdatedNotificationEmailSender(uuidGenerator, emailSender, eventBus);

	it("send a user updated notification email", async () => {
		const userId = UserIdMother.create().value;
		const userName = UserNameMother.create().value;
		const propertyUpdated = "email";
		const emailAddress = EmailAddressMother.create().value;

		const email = UserUpdatedNotificationEmailMother.create({
			userId,
			userName,
			propertyUpdated,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>",
			to: emailAddress,
			subject: `${userName}, tu ${propertyUpdated} se ha cambiado`,
			body: `Hola, ${userName}\nHemos cambiado tu ${propertyUpdated} correctamente. Si no fuiste tú, por favor, contacta a soporte técnico lo antes posible.`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = UserUpdatedNotificationEmailSentDomainEventMother.create(expectedEmailPrimitives);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await sender.send(userId, userName, propertyUpdated, emailAddress);
	});
});
