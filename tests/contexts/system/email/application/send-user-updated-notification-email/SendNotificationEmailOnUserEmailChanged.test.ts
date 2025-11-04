import { SendNotificationEmailOnUserEmailChanged } from "../../../../../../src/contexts/system/email/application/send-user-updated-notification-email/SendNotificationEmailOnUserEmailChanged";
import { UserUpdatedNotificationEmailSender } from "../../../../../../src/contexts/system/email/application/send-user-updated-notification-email/UserUpdatedNotificationEmailSender";
import { UserEmailUpdatedDomainEventMother } from "../../../../cma/users/domain/event/UserEmailUpdatedDomainEvent";
import { UserMother } from "../../../../cma/users/domain/UserMother";
import { MockUserFinder } from "../../../../cma/users/infrastructure/MockUserFinder";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { UserUpdatedNotificationEmailMother } from "../../domain/UserUpdatedNotificationEmailMother";
import { UserUpdatedNotificationEmailSentDomainEventMother } from "../../domain/event/UserUpdatedNotificationEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("SendNotificationEmailOnUserEmailChanged should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const userFinder = new MockUserFinder();
	const subscriber = new SendNotificationEmailOnUserEmailChanged(
		new UserUpdatedNotificationEmailSender(uuidGenerator, emailSender, eventBus),
		userFinder
	);

	it("send a notification email when user email is changed", async () => {
		const event = UserEmailUpdatedDomainEventMother.create();
		const user = UserMother.create({
			id: event.id,
			name: "Test User",
			email: event.email
		});

		const propertyUpdated = "email";

		const email = UserUpdatedNotificationEmailMother.create({
			userId: event.id,
			userName: user.toPrimitives().name,
			propertyUpdated,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>",
			to: event.email,
			subject: `${user.toPrimitives().name}, tu ${propertyUpdated} se ha cambiado`,
			body: `Hola, ${user.toPrimitives().name}\nHemos cambiado tu ${propertyUpdated} correctamente. Si no fuiste tú, por favor, contacta a soporte técnico lo antes posible.`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = UserUpdatedNotificationEmailSentDomainEventMother.create(expectedEmailPrimitives);
		userFinder.shouldFind(user);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await subscriber.on(event);
	});
});
