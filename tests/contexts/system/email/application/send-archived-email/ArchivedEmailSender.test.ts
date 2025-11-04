import { ArchivedEmailSender } from "../../../../../../src/contexts/system/email/application/send-archived-email/ArchivedEmailSender";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { ArchivedEmailMother } from "../../domain/ArchivedEmailMother";
import { ArchivedEmailSentDomainEventMother } from "../../domain/event/ArchivedEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("ArchivedEmailSender should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const sender = new ArchivedEmailSender(uuidGenerator, emailSender, eventBus);

	it("send an archived email", async () => {
		const userId = UserIdMother.create().value;
		const userName = UserNameMother.create().value;
		const emailAddress = EmailAddressMother.create().value;

		const email = ArchivedEmailMother.create({
			userId,
			userName,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>",
			to: emailAddress,
			subject: `Esperamos volver a verte, ${userName}`,
			body: `Hola, ${userName}\n\nTu usuario ha sido eliminado del PNFi. Si deseas volver a utilizar el servicio, por favor, ponte en contacto con nosotros.\n\nSaludos,\nEl equipo de PNFi`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = ArchivedEmailSentDomainEventMother.create(expectedEmailPrimitives);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await sender.send(userId, userName, emailAddress);
	});
});
