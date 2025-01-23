import { SendWelcomeEmailOnUserRegistered } from "../../../../../../src/contexts/system/email/application/send-welcome-email/SendWelcomeEmailOnUserRegistered";
import { WelcomeEmailSender } from "../../../../../../src/contexts/system/email/application/send-welcome-email/WelcomeEmailSender";
import { UserRegisteredDomainEventMother } from "../../../../cma/users/domain/event/UserRegisteredDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { WelcomeEmailSentDomainEventMother } from "../../domain/event/WelcomeEmailSentDomainEventMother";
import { WelcomeEmailMother } from "../../domain/WelcomeEmailMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("SendWelcomeEmailOnUserRegistered should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const subscriber = new SendWelcomeEmailOnUserRegistered(
		new WelcomeEmailSender(uuidGenerator, emailSender, eventBus)
	);

	it("send a welcome email when a user is registered", async () => {
		const event = UserRegisteredDomainEventMother.create();

		const email = WelcomeEmailMother.create({
			userId: event.id,
			userName: event.name,
			from: "PNFi <octagon@pnfi.pro>",
			to: event.email,
			subject: `Bienvenido al PNFi, ${event.name}`,
			html: `<html><h1>Bienvenido a la cartelera del PNFi, ${event.name} 🎉</h1><p>Antes de proseguir, debes confirmar tu correo electrónico iniciando sesión en:<br><a href="https://pnfi.pro/">https://pnfi.pro/</a></p></html>`,
			text: `Bienvenido a la cartelera del PNFi, ${event.name} 🎉\nAntes de proseguir, debes confirmar tu correo electrónico iniciando sesión en:\nhttps://pnfi.pro/`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent =
			WelcomeEmailSentDomainEventMother.create(expectedEmailPrimitives);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await subscriber.on(event);
	});
});
