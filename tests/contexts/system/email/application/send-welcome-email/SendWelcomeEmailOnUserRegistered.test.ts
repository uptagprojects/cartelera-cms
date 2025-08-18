import { faker } from "@faker-js/faker";
import { SendWelcomeEmailOnUserRegistered } from "../../../../../../src/contexts/system/email/application/send-welcome-email/SendWelcomeEmailOnUserRegistered";
import { WelcomeEmailSender } from "../../../../../../src/contexts/system/email/application/send-welcome-email/WelcomeEmailSender";
import { UserRegisteredDomainEventMother } from "../../../../../contexts/cma/users/domain/event/UserRegisteredDomainEventMother";
import { MockEventBus } from "../../../../../contexts/shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../../contexts/shared/infrastructure/MockUuidGenerator";
import { WelcomeEmailSentDomainEventMother } from "../../domain/event/WelcomeEmailSentDomainEventMother";
import { WelcomeEmailMother } from "../../domain/WelcomeEmailMother";
import { MockEmailSender } from "../../infrastructure/MockEmailSender";
import { MockMagicLinkGenerator } from "../../infrastructure/MockMagicLinkGenerator";

describe("SendWelcomeEmailOnUserRegistered should", () => {
    const uuidGenerator = new MockUuidGenerator();
    const emailSender = new MockEmailSender();
    const eventBus = new MockEventBus();
    const magicLinkGenerator = new MockMagicLinkGenerator();
    const subscriber = new SendWelcomeEmailOnUserRegistered(
        new WelcomeEmailSender(uuidGenerator, magicLinkGenerator, emailSender, eventBus)
    );

    it("send a welcome email when a user is registered", async () => {
        const userRegisteredEvent = UserRegisteredDomainEventMother.create();
        const expectedConfirmationUrl = faker.internet.url();

        const email = WelcomeEmailMother.create({
            to: userRegisteredEvent.email,
            userName: userRegisteredEvent.name,
            presenterName: userRegisteredEvent.presenterName,
            presenterEmail: userRegisteredEvent.presenterEmail,
            confirmationUrl: expectedConfirmationUrl
        });

        const expectedEmailPrimitives = email.toPrimitives();
        const expectedDomainEvent = WelcomeEmailSentDomainEventMother.create(expectedEmailPrimitives);
        uuidGenerator.shouldGenerate(expectedEmailPrimitives.id);
        magicLinkGenerator.shouldGenerate(expectedConfirmationUrl);
        emailSender.shouldSend(email);
        eventBus.shouldPublish([expectedDomainEvent]);

        await subscriber.on(userRegisteredEvent);
    });
});
