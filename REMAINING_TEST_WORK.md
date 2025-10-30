# Remaining Unit Test Work

This document outlines the remaining unit test work needed for application use cases, organized by context and module.

## Status Summary

- **Completed**: 19 use cases (CMA Announcements: 9, CMA Users: 10)
- **Remaining**: ~94 use cases across 16 modules
- **Reference Implementation**: `tests/contexts/cma/announcements/` demonstrates the complete pattern

---

## CMA Context (Content Management Application)

### 1. CMA Courses Module
- **Use Cases**: 10
- **Priority**: High
- **Tasks**:
  - [ ] Create Mother objects: CourseIdMother, CourseNameMother, CourseAbstractMother, CourseLocationMother, CoursePictureMother, CoursePriceMother, CourseMother
  - [ ] Create MockCourseRepository
  - [ ] Create Event Mothers: CoursePublishedDomainEventMother
  - [ ] Create use case tests:
    - [ ] CourseFinder.test.ts
    - [ ] CoursePublisher.test.ts
    - [ ] CourseRemover.test.ts
    - [ ] AllCoursesSearcher.test.ts
    - [ ] CoursesByCriteriaSearcher.test.ts
    - [ ] courseAbstractUpdater.test.ts
    - [ ] CourseLocationUpdater.test.ts
    - [ ] courseNameUpdater.test.ts
    - [ ] coursePictureUpdater.test.ts
    - [ ] coursePriceUpdater.test.ts

### 2. CMA Events Module
- **Use Cases**: 9
- **Priority**: High
- **Tasks**:
  - [ ] Create Mother objects: EventIdMother, EventNameMother, EventLocationMother, EventStartDateMother, EventEndDateMother, EventMother
  - [ ] Create MockEventRepository
  - [ ] Create Event Mothers: EventPublishedDomainEventMother
  - [ ] Create use case tests:
    - [ ] EventFinder.test.ts
    - [ ] EventPublisher.test.ts
    - [ ] EventRemover.test.ts
    - [ ] AllEventsSearcher.test.ts
    - [ ] EventsByCriteriaSearcher.test.ts
    - [ ] EventEndDateUpdater.test.ts
    - [ ] EventLocationUpdater.test.ts
    - [ ] EventNameUpdater.test.ts
    - [ ] EventStartDateUpdater.test.ts

### 3. CMA Guides Module
- **Use Cases**: 10
- **Priority**: High
- **Tasks**:
  - [ ] Create Mother objects: GuideIdMother, GuideTitleMother, GuideContentMother, GuideMother
  - [ ] Create MockGuideRepository
  - [ ] Create Event Mothers: GuidePostedDomainEventMother, GuidePublishedDomainEventMother, GuideArchivedDomainEventMother, GuideRestoredDomainEventMother
  - [ ] Create use case tests:
    - [ ] GuideArchiver.test.ts
    - [ ] GuideFinder.test.ts
    - [ ] GuidePoster.test.ts
    - [ ] GuidePublisher.test.ts
    - [ ] GuideRemover.test.ts
    - [ ] GuideRestorer.test.ts
    - [ ] AllGuidesSearcher.test.ts
    - [ ] GuidesByCriteriaSearcher.test.ts
    - [ ] GuideContentUpdater.test.ts
    - [ ] GuideTitleUpdater.test.ts

### 4. CMA Guide Attachments Module
- **Use Cases**: 3
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects: GuideAttachmentIdMother, GuideAttachmentMother
  - [ ] Create MockGuideAttachmentRepository
  - [ ] Create use case tests:
    - [ ] GuideAttachmentRemover.test.ts
    - [ ] GuideAttachmentsByGuideSearcher.test.ts
    - [ ] GuideAttachmentUploader.test.ts

### 5. CMA Schedules Module
- **Use Cases**: 9
- **Priority**: High
- **Tasks**:
  - [ ] Create Mother objects: ScheduleIdMother, ScheduleNameMother, ScheduleStartDateMother, ScheduleFinishDateMother, ScheduleMother
  - [ ] Create MockScheduleRepository
  - [ ] Create Event Mothers: SchedulePostedDomainEventMother, SchedulePublishedDomainEventMother, ScheduleArchivedDomainEventMother, ScheduleRestoredDomainEventMother
  - [ ] Create use case tests:
    - [ ] ScheduleArchiver.test.ts
    - [ ] ScheduleFinder.test.ts
    - [ ] SchedulePoster.test.ts
    - [ ] SchedulePublisher.test.ts
    - [ ] ScheduleRestorer.test.ts
    - [ ] SchedulesByCriteriaSearcher.test.ts
    - [ ] ScheduleFinishDateUpdater.test.ts
    - [ ] ScheduleNameUpdater.test.ts
    - [ ] ScheduleStartDateUpdater.test.ts

### 6. CMA Schedule Attachments Module
- **Use Cases**: 3
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects: ScheduleAttachmentIdMother, ScheduleAttachmentMother
  - [ ] Create MockScheduleAttachmentRepository
  - [ ] Create use case tests:
    - [ ] ScheduleAttachmentRemover.test.ts
    - [ ] ScheduleAttachmentsByScheduleSearcher.test.ts
    - [ ] ScheduleAttachmentUploader.test.ts

### 7. CMA UC Module
- **Use Cases**: 5
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects: UCIdMother, UCNameMother, UCMother
  - [ ] Create MockUCRepository
  - [ ] Create Event Mothers: UCCreatedDomainEventMother
  - [ ] Create use case tests:
    - [ ] UCCreator.test.ts
    - [ ] UCFinder.test.ts
    - [ ] UCRemover.test.ts
    - [ ] UCRenamer.test.ts
    - [ ] AllUCSearcher.test.ts

### 8. CMA Images Module
- **Use Cases**: 1
- **Priority**: Low
- **Tasks**:
  - [ ] Create Mother objects: ImageIdMother, ImageMother
  - [ ] Create MockImageRepository (if needed)
  - [ ] Create use case tests:
    - [ ] ImageUploader.test.ts

---

## CDA Context (Content Delivery Application)

### 9. CDA Activities Module
- **Use Cases**: 6 (includes event handlers)
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects: ActivityIdMother, ActivityMother
  - [ ] Create MockActivityRepository
  - [ ] Create use case tests:
    - [ ] ActivitiesByCriteriaSearcher.test.ts
    - [ ] PublishedActivityUpdater.test.ts
    - [ ] UpdateActivityOnAnnouncementPublished.test.ts
    - [ ] UpdateActivityOnCoursePublished.test.ts
    - [ ] UpdateActivityOnEventPublished.test.ts
    - [ ] UpdateActivityOnGuidePublished.test.ts

### 10. CDA Announcements Module
- **Use Cases**: 5 (includes event handlers)
- **Priority**: Medium
- **Tasks**:
  - [ ] Reuse CMA Announcement infrastructure or create CDA-specific if needed
  - [ ] Create use case tests:
    - [ ] RemoveOnAnnouncementUnpublished.test.ts
    - [ ] UnpublishedAnnouncementRemover.test.ts
    - [ ] AllCdaAnnouncementsSearcher.test.ts
    - [ ] PublishedAnnouncementUpdater.test.ts
    - [ ] UpdateAnnouncementOnPublished.test.ts

### 11. CDA Courses Module
- **Use Cases**: 6 (includes event handlers, 1 exists)
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects if not already available
  - [ ] Create use case tests (5 remaining):
    - [ ] RemoveOnCourseUnpublished.test.ts
    - [ ] UnpublishedCourseRemover.test.ts
    - [ ] CoursesByCriteriaSearcher.test.ts
    - [ ] PublishedCourseUpdater.test.ts
    - [ ] UpdateCourseOnPublished.test.ts

### 12. CDA Events Module
- **Use Cases**: 6 (includes event handlers)
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects if not already available
  - [ ] Create use case tests:
    - [ ] EventFinder.test.ts
    - [ ] RemoveOnEventUnpublished.test.ts
    - [ ] UnpublishedEventRemover.test.ts
    - [ ] EventsByCriteriaSearcher.test.ts
    - [ ] PublishedEventUpdater.test.ts
    - [ ] UpdateEventOnPublished.test.ts

### 13. CDA Guides Module
- **Use Cases**: 6 (includes event handlers)
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects if not already available
  - [ ] Create use case tests:
    - [ ] GuideFinder.test.ts
    - [ ] RemoveOnGuideUnpublished.test.ts
    - [ ] UnpublishedGuideRemover.test.ts
    - [ ] GuidesByCriteriaSearcher.test.ts
    - [ ] PublishedGuideUpdater.test.ts
    - [ ] UpdateGuideOnPublished.test.ts

### 14. CDA Schedule Module
- **Use Cases**: 3
- **Priority**: Low
- **Tasks**:
  - [ ] Create Mother objects if not already available
  - [ ] Create use case tests:
    - [ ] ScheduleFinder.test.ts
    - [ ] AllSchedulesSearcher.test.ts
    - [ ] ScheduleByCriteriaSearcher.test.ts

### 15. CDA UC Module
- **Use Cases**: 10 (includes event handlers)
- **Priority**: Medium
- **Tasks**:
  - [ ] Create Mother objects if not already available
  - [ ] Create use case tests:
    - [ ] DecreaseTotalGuidesOnGuideUnpublished.test.ts
    - [ ] UCTotalGuidesDecreaser.test.ts
    - [ ] UCFinder.test.ts
    - [ ] IncreaseTotalGuidesOnGuidePublished.test.ts
    - [ ] UCTotalGuidesIncreaser.test.ts
    - [ ] RemoveOnUCUnpublished.test.ts
    - [ ] UnpublishedUCRemover.test.ts
    - [ ] AllUCSearcher.test.ts
    - [ ] PublishedUCUpdater.test.ts
    - [ ] UpdateUCOnPublished.test.ts

---

## System Context

### 16. System Email Module
- **Use Cases**: 10 (1 exists)
- **Priority**: High
- **Tasks**:
  - [ ] Create Mother objects for email types (if not already available)
  - [ ] Create use case tests (9 remaining):
    - [ ] ArchivedEmailSender.test.ts
    - [ ] SendArchivedEmailOnUserArchived.test.ts
    - [ ] BlockedEmailSender.test.ts
    - [ ] SendBlockedEmailOnUserBlocked.test.ts
    - [ ] RestoredEmailSender.test.ts
    - [ ] SendRestoredEmailOnUserRestored.test.ts
    - [ ] SendNotificationEmailOnUserEmailChanged.test.ts
    - [ ] UserUpdatedNotificationEmailSender.test.ts
    - [ ] WelcomeEmailSender.test.ts (or fix existing)

---

## Testing Pattern Reference

The **Announcements module** (`tests/contexts/cma/announcements/`) provides a complete reference implementation:

1. **Mother Objects**: Located in `domain/` folder
   - Value Object Mothers (IdMother, NameMother, etc.)
   - Entity Mother combining value objects
   - Event Mothers in `domain/event/` folder

2. **Mock Repository**: Located in `infrastructure/` folder
   - Implements repository interface
   - Uses Jest mocks for method expectations
   - Provides `should*` methods for test setup

3. **Use Case Tests**: Located in `application/{use-case-name}/` folder
   - Follow the "should" naming convention
   - Set up mocks with `should*` methods
   - Call the use case
   - Verify behavior through mock assertions

---

## Known Issues to Address

1. **Timestamp Matching**: Use cases that create entities may have millisecond-level timestamp mismatches in domain events
2. **Existing Test Failures**: `UserRegistrar.test.ts` and `SendWelcomeEmailOnUserRegistered.test.ts` need fixing
3. **MockUserRepository**: Has parameter matching issues with UserId objects that need resolution

---

## Estimation

- **Small modules** (1-3 use cases): 2-4 hours each
- **Medium modules** (4-6 use cases): 4-8 hours each
- **Large modules** (7-10 use cases): 8-16 hours each

**Total estimated effort**: ~160-240 hours for all remaining work
