import { BlockedEmailSender } from "../../../../../../src/contexts/system/email/application/send-blocked-email/BlockedEmailSender";
import { SendBlockedEmailOnUserBlocked } from "../../../../../../src/contexts/system/email/application/send-blocked-email/SendBlockedEmailOnUserBlocked";
import { UserBlockedDomainEventMother } from "../../../../cma/users/domain/event/UserBlockedDomainEventMother";
import { UserMother } from "../../../../cma/users/domain/UserMother";
import { MockUserFinder } from "../../../../cma/users/infrastructure/MockUserFinder";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { BlockedEmailMother } from "../../domain/BlockedEmailMother";
import { BlockedEmailSentDomainEventMother } from "../../domain/event/BlockedEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("SendBlockedEmailOnUserBlocked should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const userFinder = new MockUserFinder();
	const subscriber = new SendBlockedEmailOnUserBlocked(
		new BlockedEmailSender(uuidGenerator, emailSender, eventBus),
		userFinder
	);

	it("send a blocked email when a user is blocked", async () => {
		const event = UserBlockedDomainEventMother.create();
		const user = UserMother.create({
			id: event.id,
			name: "Test User",
			email: "test@example.com"
		});

		const email = BlockedEmailMother.create({
			userId: event.id,
			userName: user.toPrimitives().name,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>",
			to: user.toPrimitives().email,
			subject: `Has sido bloqueado del PNFi, ${user.toPrimitives().name}`,
			body: `Hola ${user.toPrimitives().name},\n\nHas sido bloqueado del PNFi. pa Si crees que esto es un error, por favor contacta a soporte.\n\nSaludos,\nEl equipo de PNFi`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = BlockedEmailSentDomainEventMother.create(expectedEmailPrimitives);
		userFinder.shouldFind(user);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await subscriber.on(event);
	});
});
