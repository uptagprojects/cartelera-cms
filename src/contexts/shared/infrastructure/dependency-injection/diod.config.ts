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
import { DropboxFileStorage } from "../file-storage/dropbox/DropboxFileStorage";
import { FileStorage } from "../../domain/FileStorage";
import { DropboxConnection } from "../file-storage/dropbox/DropboxConnection";
import { MarkdownRemover } from "../../domain/MarkdownRemover";
import { OfficialMarkdownRemover } from "../OfficialMarkdownRemover";
import { SendNotificationEmailOnUserEmailChanged } from "../../../system/email/application/send-user-updated-notification-email/SendNotificationEmailOnUserEmailChanged";
import { UserUpdatedNotificationEmailSender } from "../../../system/email/application/send-user-updated-notification-email/UserUpdatedNotificationEmailSender";
import { SendRestoredEmailOnUserRestored } from "../../../system/email/application/send-restored-email/SendRestoredEmailOnUserRestored";
import { RestoredEmailSender } from "../../../system/email/application/send-restored-email/RestoredEmailSender";
import { SendBlockedEmailOnUserBlocked } from "../../../system/email/application/send-blocked-email/SendBlockedEmailOnUserBlocked";
import { BlockedEmailSender } from "../../../system/email/application/send-blocked-email/BlockedEmailSender";
import { SendArchivedEmailOnUserArchived } from "../../../system/email/application/send-archived-email/SendArchivedEmailOnUserArchived";
import { ArchivedEmailSender } from "../../../system/email/application/send-archived-email/ArchivedEmailSender";
import { UpdateActivityOnAnnouncementPublished } from "../../../cda/activities/application/update-on-published/UpdateActivityOnAnnouncementPublished";
import { UpdateActivityOnCoursePublished } from "../../../cda/activities/application/update-on-published/UpdateActivityOnCoursePublished";
import { UpdateActivityOnEventPublished } from "../../../cda/activities/application/update-on-published/UpdateActivityOnEventPublished";
import { UpdateActivityOnGuidePublished } from "../../../cda/activities/application/update-on-published/UpdateActivityOnGuidePublished";
import { PublishedActivityUpdater } from "../../../cda/activities/application/update-on-published/PublishedActivityUpdater";
import { UpdateAnnouncementOnPublished } from "../../../cda/announcements/application/update-on-published/UpdateAnnouncementOnPublished";
import { PublishedAnnouncementUpdater } from "../../../cda/announcements/application/update-on-published/PublishedAnnouncementUpdater";
import { RemoveOnAnnouncementUnpublished } from "../../../cda/announcements/application/remove-on-unpublished/RemoveOnAnnouncementUnpublished";
import { UnpublishedAnnouncementRemover } from "../../../cda/announcements/application/remove-on-unpublished/UnpublishedAnnouncementRemover";
import { UpdateCourseOnPublished } from "../../../cda/courses/application/update-on-published/UpdateCourseOnPublished";
import { PublishedCourseUpdater } from "../../../cda/courses/application/update-on-published/PublishedCourseUpdater";
import { RemoveOnCourseUnpublished } from "../../../cda/courses/application/remove-on-unpublished/RemoveOnCourseUnpublished";

const builder = new ContainerBuilder();

builder.register(UuidGenerator).use(OfficialUuidGenerator);
builder.register(MarkdownRemover).use(OfficialMarkdownRemover);

builder.registerAndUse(PostgresConnection);

builder.registerAndUse(RabbitMQConnection);
builder.registerAndUse(DomainEventFailover);
builder.register(EventBus).use(RabbitMQEventBus);

builder.registerAndUse(DropboxConnection);
builder.register(FileStorage).use(DropboxFileStorage);

// system/email
builder.register(EmailSender).use(MailjetEmailSender);
builder.registerAndUse(SendWelcomeEmailOnUserRegistered).addTag("subscriber");
builder.registerAndUse(WelcomeEmailSender);
builder.registerAndUse(SendNotificationEmailOnUserEmailChanged).addTag("subscriber");
builder.registerAndUse(UserUpdatedNotificationEmailSender);
builder.registerAndUse(SendRestoredEmailOnUserRestored).addTag("subscriber");
builder.registerAndUse(RestoredEmailSender);
builder.registerAndUse(SendBlockedEmailOnUserBlocked).addTag("subscriber");
builder.registerAndUse(BlockedEmailSender);
builder.registerAndUse(SendArchivedEmailOnUserArchived).addTag("subscriber");
builder.registerAndUse(ArchivedEmailSender);

// cda/activities
builder.registerAndUse(PublishedActivityUpdater);
builder.registerAndUse(UpdateActivityOnAnnouncementPublished).addTag("subscriber");
builder.registerAndUse(UpdateActivityOnCoursePublished).addTag("subscriber");
builder.registerAndUse(UpdateActivityOnEventPublished).addTag("subscriber");
builder.registerAndUse(UpdateActivityOnGuidePublished).addTag("subscriber");

// cda/announcements
builder.registerAndUse(UpdateAnnouncementOnPublished).addTag("subscriber");
builder.registerAndUse(PublishedAnnouncementUpdater);
builder.registerAndUse(RemoveOnAnnouncementUnpublished).addTag("subscriber");
builder.registerAndUse(UnpublishedAnnouncementRemover);

// cda/courses
builder.registerAndUse(UpdateCourseOnPublished).addTag("subscriber");
builder.registerAndUse(PublishedCourseUpdater)
builder.registerAndUse(RemoveOnCourseUnpublished).addTag("subscriber");
builder.registerAndUse(RemoveOnCourseUnpublished);

// cda/events


// cda/guides


// cda/uc


export const container = builder.build();
