import { ArchivedEmailSender } from "../../../../../../src/contexts/system/email/application/send-archived-email/ArchivedEmailSender";
import { SendArchivedEmailOnUserArchived } from "../../../../../../src/contexts/system/email/application/send-archived-email/SendArchivedEmailOnUserArchived";
import { UserArchivedDomainEventMother } from "../../../../cma/users/domain/event/UserArchivedDomainEventMother";
import { UserMother } from "../../../../cma/users/domain/UserMother";
import { MockUserFinder } from "../../../../cma/users/infrastructure/MockUserFinder";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { ArchivedEmailMother } from "../../domain/ArchivedEmailMother";
import { ArchivedEmailSentDomainEventMother } from "../../domain/event/ArchivedEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("SendArchivedEmailOnUserArchived should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const userFinder = new MockUserFinder();
	const subscriber = new SendArchivedEmailOnUserArchived(
		new ArchivedEmailSender(uuidGenerator, emailSender, eventBus),
		userFinder
	);

	it("send an archived email when a user is archived", async () => {
		const event = UserArchivedDomainEventMother.create();
		const user = UserMother.create({
			id: event.id,
			name: "Test User",
			email: "test@example.com"
		});

		const email = ArchivedEmailMother.create({
			userId: event.id,
			userName: user.toPrimitives().name,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>",
			to: user.toPrimitives().email,
			subject: `Esperamos volver a verte, ${user.toPrimitives().name}`,
			body: `Hola, ${user.toPrimitives().name}\n\nTu usuario ha sido eliminado del PNFi. Si deseas volver a utilizar el servicio, por favor, ponte en contacto con nosotros.\n\nSaludos,\nEl equipo de PNFi`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = ArchivedEmailSentDomainEventMother.create(expectedEmailPrimitives);
		userFinder.shouldFind(user);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await subscriber.on(event);
	});
});
