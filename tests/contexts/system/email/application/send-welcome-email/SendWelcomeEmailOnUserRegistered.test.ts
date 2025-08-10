import { SendWelcomeEmailOnUserRegistered } from "../../../../../../src/contexts/system/email/application/send-welcome-email/SendWelcomeEmailOnUserRegistered";
import { WelcomeEmailSender } from "../../../../../../src/contexts/system/email/application/send-welcome-email/WelcomeEmailSender";
import { UserRegisteredDomainEventMother } from "../../../../../contexts/cma/users/domain/event/UserRegisteredDomainEventMother";
import { MockEventBus } from "../../../../../contexts/shared/infrastructure/MockEventBus";
import { MockUuidGenerator } from "../../../../../contexts/shared/infrastructure/MockUuidGenerator";
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
            subject: `Bienvenido al PNFi, ${event.name}`
        });

        const expectedEmailPrimitives = email.toPrimitives();
        const expectedDomainEvent = WelcomeEmailSentDomainEventMother.create(expectedEmailPrimitives);
        uuidGenerator.shouldGenerate(email.toPrimitives().id);
        emailSender.shouldSend(email);
        eventBus.shouldPublish([expectedDomainEvent]);

        await subscriber.on(event);
    });
});
