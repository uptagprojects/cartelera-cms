import { ContainerBuilder } from "diod";

import { SendWelcomeEmailOnUserRegistered } from "../../../system/email/application/send-welcome-email/SendWelcomeEmailOnUserRegistered";
import { WelcomeEmailSender } from "../../../system/email/application/send-welcome-email/WelcomeEmailSender";
import { EmailSender } from "../../../system/email/domain/EmailSender";
import { MailjetEmailSender } from "../../../system/email/infrastructure/MailjetEmailSender";
import { EventBus } from "../../domain/event/EventBus";
import { UuidGenerator } from "../../domain/UuidGenerator";
import { DomainEventFailover } from "../event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../event-bus/rabbitmq/RabbitMQEventBus";
import { OfficialUuidGenerator } from "../OfficialUuidGenerator";
import { PostgresConnection } from "../PostgresConnection";

const builder = new ContainerBuilder();

builder.register(UuidGenerator).use(OfficialUuidGenerator);

builder.registerAndUse(PostgresConnection);

builder.registerAndUse(RabbitMQConnection);
builder.registerAndUse(DomainEventFailover);
builder.register(EventBus).use(RabbitMQEventBus);

builder.registerAndUse(SendWelcomeEmailOnUserRegistered).addTag("subscriber");
builder.registerAndUse(WelcomeEmailSender);
builder.register(EmailSender).use(MailjetEmailSender);

export const container = builder.build();
