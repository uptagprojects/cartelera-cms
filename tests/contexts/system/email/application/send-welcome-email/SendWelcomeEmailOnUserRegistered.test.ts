import { faker } from "@faker-js/faker";
import { SendWelcomeEmailOnUserRegistered } from "../../../../../../src/contexts/system/email/application/send-welcome-email/SendWelcomeEmailOnUserRegistered";
import { WelcomeEmailSender } from "../../../../../../src/contexts/system/email/application/send-welcome-email/WelcomeEmailSender";
import { WelcomeEmail } from "../../../../../../src/contexts/system/email/domain/WelcomeEmail";
import { UserRegisteredDomainEventMother } from "../../../../cma/users/domain/event/UserRegisteredDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";

describe("SendWelcomeEmailOnUserRegistered should", () => {
	it("send a welcome email when a user is registered", async () => {
		const uuidGenerator = new MockUuidGenerator();
		const emailSender = new MockEmailSender();
		const eventBus = new MockEventBus();
		const subscriber = new SendWelcomeEmailOnUserRegistered(
			new WelcomeEmailSender(uuidGenerator, emailSender, eventBus)
		);
		const event = UserRegisteredDomainEventMother.create();
		uuidGenerator.shouldGenerate(faker.string.uuid());
		emailSender.shouldSend();

		await subscriber.on(event);

		emailSender.assertSendHaveBeenCalledWith(expect.any(WelcomeEmail));
	});
});
