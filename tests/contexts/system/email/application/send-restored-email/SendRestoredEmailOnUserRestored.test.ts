import { RestoredEmailSender } from "../../../../../../src/contexts/system/email/application/send-restored-email/RestoredEmailSender";
import { SendRestoredEmailOnUserRestored } from "../../../../../../src/contexts/system/email/application/send-restored-email/SendRestoredEmailOnUserRestored";
import { UserRestoredDomainEventMother } from "../../../../cma/users/domain/event/UserRestoredDomainEventMother";
import { UserMother } from "../../../../cma/users/domain/UserMother";
import { MockUserFinder } from "../../../../cma/users/infrastructure/MockUserFinder";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { RestoredEmailMother } from "../../domain/RestoredEmailMother";
import { RestoredEmailSentDomainEventMother } from "../../domain/event/RestoredEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("SendRestoredEmailOnUserRestored should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const userFinder = new MockUserFinder();
	const subscriber = new SendRestoredEmailOnUserRestored(
		new RestoredEmailSender(uuidGenerator, emailSender, eventBus),
		userFinder
	);

	it("send a restored email when a user is restored", async () => {
		const event = UserRestoredDomainEventMother.create();
		const user = UserMother.create({
			id: event.id,
			name: "Test User",
			email: "test@example.com"
		});

		const email = RestoredEmailMother.create({
			userId: event.id,
			userName: user.toPrimitives().name,
			from: process.env.SYSTEM_EMAIL_SENDER ?? "octagon@pnfi.pro",
			to: user.toPrimitives().email,
			subject: `Bienvenido de vuelta, ${user.toPrimitives().name}`,
			body: `Bienvenido de vuelta, ${user.toPrimitives().name}.\n\nTu acceso al PNFi ha sido restaurado. Si tienes alguna pregunta, no dudes en contactarnos.`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = RestoredEmailSentDomainEventMother.create(expectedEmailPrimitives);
		userFinder.shouldFind(user);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await subscriber.on(event);
	});
});
