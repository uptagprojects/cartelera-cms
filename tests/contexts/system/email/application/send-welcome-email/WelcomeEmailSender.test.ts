import { WelcomeEmailSender } from "../../../../../../src/contexts/system/email/application/send-welcome-email/WelcomeEmailSender";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { WelcomeEmailMother } from "../../domain/WelcomeEmailMother";
import { WelcomeEmailSentDomainEventMother } from "../../domain/event/WelcomeEmailSentDomainEventMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("WelcomeEmailSender should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const emailSender = new MockEmailSender();
	const eventBus = new MockEventBus();
	const sender = new WelcomeEmailSender(uuidGenerator, emailSender, eventBus);

	it("send a welcome email", async () => {
		const userId = UserIdMother.create().value;
		const userName = UserNameMother.create().value;
		const emailAddress = EmailAddressMother.create().value;

		const email = WelcomeEmailMother.create({
			userId,
			userName,
			from: "noreply@pnfi.uptag.net",
			to: emailAddress,
			subject: `Bienvenido al PNFi, ${userName}`,
			body: `Bienvenido a la cartelera del PNFi, ${userName}! Completa tu perfil en https://cartelerapnfi.uptag.net/profile`
		});

		const expectedEmailPrimitives = email.toPrimitives();
		const expectedDomainEvent = WelcomeEmailSentDomainEventMother.create(expectedEmailPrimitives);
		uuidGenerator.shouldGenerate(email.toPrimitives().id);
		emailSender.shouldSend(email);
		eventBus.shouldPublish([expectedDomainEvent]);

		await sender.send(userId, userName, emailAddress);
	});
});
