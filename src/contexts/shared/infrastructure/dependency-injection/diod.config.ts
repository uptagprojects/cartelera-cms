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
import { UnpublishedCourseRemover } from "../../../cda/courses/application/remove-on-unpublished/UnpublishedCourseRemover";
import { UserFinder } from "../../../cma/users/domain/UserFinder";
import { UserRepository } from "../../../cma/users/domain/UserRepository";
import { UpdateEventOnPublished } from "../../../cda/events/application/update-on-published/UpdateEventOnPublished";
import { PublishedEventUpdater } from "../../../cda/events/application/update-on-published/PublishedEventUpdater";
import { RemoveOnEventUnpublished } from "../../../cda/events/application/remove-on-unpublished/RemoveOnEventUnpublished";
import { UnpublishedEventRemover } from "../../../cda/events/application/remove-on-unpublished/UnpublishedEventRemover";
import { UpdateGuideOnPublished } from "../../../cda/guides/application/update-on-published/UpdateGuideOnPublished";
import { PublishedGuideUpdater } from "../../../cda/guides/application/update-on-published/PublishedGuideUpdater";
import { RemoveOnGuideUnpublished } from "../../../cda/guides/application/remove-on-unpublished/RemoveOnGuideUnpublished";
import { UnpublishedGuideRemover } from "../../../cda/guides/application/remove-on-unpublished/UnpublishedGuideRemover";
import { UpdateUCOnPublished } from "../../../cda/uc/application/update-on-published/UpdateUCOnPublished";
import { PublishedUCUpdater } from "../../../cda/uc/application/update-on-published/PublishedUCUpdater";
import { IncreaseTotalGuidesOnGuidePublished } from "../../../cda/uc/application/increase-total-guides-on-guide-published/IncreaseTotalGuidesOnGuidePublished";
import { UCTotalGuidesIncreaser } from "../../../cda/uc/application/increase-total-guides-on-guide-published/UCTotalGuidesIncreaser";
import { DecreaseTotalGuidesOnGuideArchived } from "../../../cda/uc/application/decrease-total-guides-on-guide-archived/DecreaseTotalGuidesOnGuideArchived";
import { UCTotalGuidesDecreaser } from "../../../cda/uc/application/decrease-total-guides-on-guide-archived/UCTotalGuidesDecreaser";
import { RemoveOnUCUnpublished } from "../../../cda/uc/application/remove-on-unpublished/RemoveOnUCUnpublished";
import { UnpublishedUCRemover } from "../../../cda/uc/application/remove-on-unpublished/UnpublishedUCRemover";
import { PostgresUserRepository } from "../../../cma/users/infrastructure/PostgresUserRepository";
import { ActivityRepository } from "../../../cda/activities/domain/ActivityRepository";
import { PostgresActivityRepository } from "../../../cda/activities/infrastructure/PostgresActivityRepository";
import { AnnouncementRepository } from "../../../cda/announcements/domain/AnnouncementRepository";
import { PostgresAnnouncementRepository } from "../../../cda/announcements/infrastructure/PostgresAnnouncementRepository";
import { CourseRepository } from "../../../cda/courses/domain/CourseRepository";
import { PostgresCourseRepository } from "../../../cda/courses/infrastructure/PostgresCourseRepository";
import { EventRepository } from "../../../cda/events/domain/EventRepository";
import { PostgresEventRepository } from "../../../cda/events/infrastructure/PostgresEventRepository";
import { GuideRepository } from "../../../cda/guides/domain/GuideRepository";
import { PostgresGuideRepository } from "../../../cda/guides/infrastructure/PostgresGuideRepository";
import { UCRepository } from "../../../cda/uc/domain/UCRepository";
import { PostgresUCRepository } from "../../../cda/uc/infrastructure/PostgresUCRepository";
import { UCFinder } from "../../../cda/uc/domain/UCFinder";
import { GuideAttachmentsByGuideSearcher } from "../../../cma/guide-attachments/application/search-all-by-schedule/GuideAttachmentsByGuideSearcher";
import { GuideAttachmentRepository } from "../../../cma/guide-attachments/domain/GuideAttachmentRepository";
import { PostgresGuideAttachmentRepository } from "../../../cma/guide-attachments/infrastructure/PostgresGuideAttachmentRepository";

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
builder.register(UserRepository).use(PostgresUserRepository);
builder.registerAndUse(UserFinder);
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
builder.register(ActivityRepository).use(PostgresActivityRepository);
builder.registerAndUse(PublishedActivityUpdater);
builder.registerAndUse(UpdateActivityOnAnnouncementPublished).addTag("subscriber");
builder.registerAndUse(UpdateActivityOnCoursePublished).addTag("subscriber");
builder.registerAndUse(UpdateActivityOnEventPublished).addTag("subscriber");
builder.registerAndUse(UpdateActivityOnGuidePublished).addTag("subscriber");

// cda/announcements
builder.register(AnnouncementRepository).use(PostgresAnnouncementRepository)
builder.registerAndUse(UpdateAnnouncementOnPublished).addTag("subscriber");
builder.registerAndUse(PublishedAnnouncementUpdater);
builder.registerAndUse(RemoveOnAnnouncementUnpublished).addTag("subscriber");
builder.registerAndUse(UnpublishedAnnouncementRemover);

// cda/courses
builder.register(CourseRepository).use(PostgresCourseRepository);
builder.registerAndUse(UpdateCourseOnPublished).addTag("subscriber");
builder.registerAndUse(PublishedCourseUpdater)
builder.registerAndUse(RemoveOnCourseUnpublished).addTag("subscriber");
builder.registerAndUse(UnpublishedCourseRemover);

// cda/events
builder.register(EventRepository).use(PostgresEventRepository);
builder.registerAndUse(UpdateEventOnPublished).addTag("subscriber");
builder.registerAndUse(PublishedEventUpdater);
builder.registerAndUse(RemoveOnEventUnpublished).addTag("subscriber");
builder.registerAndUse(UnpublishedEventRemover);

// cda/guides
builder.register(GuideRepository).use(PostgresGuideRepository);
builder.registerAndUse(UCFinder);
builder.register(GuideAttachmentRepository).use(PostgresGuideAttachmentRepository);
builder.registerAndUse(GuideAttachmentsByGuideSearcher);
builder.registerAndUse(UpdateGuideOnPublished).addTag("subscriber");
builder.registerAndUse(PublishedGuideUpdater);
builder.registerAndUse(RemoveOnGuideUnpublished).addTag("subscriber");
builder.registerAndUse(UnpublishedGuideRemover);

// cda/uc
builder.register(UCRepository).use(PostgresUCRepository);
builder.registerAndUse(UpdateUCOnPublished).addTag("subscriber");
builder.registerAndUse(PublishedUCUpdater);
builder.registerAndUse(IncreaseTotalGuidesOnGuidePublished).addTag("subscriber");
builder.registerAndUse(UCTotalGuidesIncreaser);
builder.registerAndUse(DecreaseTotalGuidesOnGuideArchived).addTag("subscriber");
builder.registerAndUse(UCTotalGuidesDecreaser);
builder.registerAndUse(RemoveOnUCUnpublished).addTag("subscriber");
builder.registerAndUse(UnpublishedUCRemover);


export const container = builder.build();
