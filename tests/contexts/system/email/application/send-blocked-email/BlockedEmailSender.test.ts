import { BlockedEmailSender } from "../../../../../../src/contexts/system/email/application/send-blocked-email/BlockedEmailSender";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { BlockedEmailMother } from "../../domain/BlockedEmailMother";
import { BlockedEmailSentDomainEventMother } from "../../domain/event/BlockedEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("BlockedEmailSender should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const sender = new BlockedEmailSender(uuidGenerator, emailSender, eventBus);

	it("send a blocked email", async () => {
		const userId = UserIdMother.create().value;
		const userName = UserNameMother.create().value;
		const emailAddress = EmailAddressMother.create().value;

		const email = BlockedEmailMother.create({
			userId,
			userName,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>",
			to: emailAddress,
			subject: `Has sido bloqueado del PNFi, ${userName}`,
			body: `Hola ${userName},\n\nHas sido bloqueado del PNFi. pa Si crees que esto es un error, por favor contacta a soporte.\n\nSaludos,\nEl equipo de PNFi`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = BlockedEmailSentDomainEventMother.create(expectedEmailPrimitives);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await sender.send(userId, userName, emailAddress);
	});
});
