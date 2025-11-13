import { RestoredEmailSender } from "../../../../../../src/contexts/system/email/application/send-restored-email/RestoredEmailSender";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { RestoredEmailMother } from "../../domain/RestoredEmailMother";
import { RestoredEmailSentDomainEventMother } from "../../domain/event/RestoredEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("RestoredEmailSender should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const sender = new RestoredEmailSender(uuidGenerator, emailSender, eventBus);

	it("send a restored email", async () => {
		const userId = UserIdMother.create().value;
		const userName = UserNameMother.create().value;
		const emailAddress = EmailAddressMother.create().value;

		const email = RestoredEmailMother.create({
			userId,
			userName,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "octagon@pnfi.pro",
			to: emailAddress,
			subject: `Bienvenido de vuelta, ${userName}`,
			body: `Bienvenido de vuelta, ${userName}.\n\nTu acceso al PNFi ha sido restaurado. Si tienes alguna pregunta, no dudes en contactarnos.`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = RestoredEmailSentDomainEventMother.create(expectedEmailPrimitives);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await sender.send(userId, userName, emailAddress);
	});
});
