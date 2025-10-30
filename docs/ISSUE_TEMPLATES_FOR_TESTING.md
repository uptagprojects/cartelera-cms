# GitHub Issue Templates for Unit Test Work

Use these templates to create individual issues for each module's unit test work.

---

## Template for CMA Modules

### Issue Title Format
```
test: add unit tests for CMA {Module} application use cases
```

### Issue Body Template
```markdown
## Context
This issue tracks the creation of unit tests for the CMA {Module} module's application use cases, following the pattern established in `tests/contexts/cma/announcements/`.

## Scope
- **Module**: CMA {Module}
- **Use Cases**: {N} use cases
- **Reference**: See `tests/contexts/cma/announcements/` for complete pattern

## Tasks

### Infrastructure Setup
- [ ] Create Mother objects for value objects:
  - [ ] {Module}IdMother
  - [ ] {Other value object mothers...}
- [ ] Create {Module}Mother (entity Mother)
- [ ] Create Mock{Module}Repository
- [ ] Create Event Mothers (if applicable):
  - [ ] {EventName}DomainEventMother

### Use Case Tests
- [ ] {UseCase1}.test.ts
- [ ] {UseCase2}.test.ts
- [ ] ... (list all use cases)

## Acceptance Criteria
- [ ] All Mother objects created following faker.js pattern
- [ ] Mock repository implements all repository interface methods
- [ ] Each use case has corresponding test file
- [ ] All tests pass (except known timestamp issues in creation use cases)
- [ ] Tests follow the established pattern from announcements module

## Files to Create
```
tests/contexts/cma/{module}/
├── domain/
│   ├── {ValueObject}Mother.ts (multiple)
│   ├── {Module}Mother.ts
│   └── event/
│       └── {Event}DomainEventMother.ts (if needed)
├── infrastructure/
│   └── Mock{Module}Repository.ts
└── application/
    ├── {use-case-1}/
    │   └── {UseCase1}.test.ts
    └── ... (one folder per use case)
```

## Related
- Reference: #[original issue number]
- Pattern: `tests/contexts/cma/announcements/`
```

---

## Template for CDA Modules

### Issue Title Format
```
test: add unit tests for CDA {Module} application use cases
```

### Issue Body Template
```markdown
## Context
This issue tracks the creation of unit tests for the CDA {Module} module's application use cases. CDA (Content Delivery Application) modules often include event handlers that react to CMA events.

## Scope
- **Module**: CDA {Module}
- **Use Cases**: {N} use cases (includes event handlers)
- **Reference**: See `tests/contexts/cma/announcements/` for complete pattern

## Tasks

### Infrastructure Setup
- [ ] Determine if CMA Mother objects can be reused or need CDA-specific versions
- [ ] Create {Module}Mother (if not reusing CMA version)
- [ ] Create Mock{Module}Repository
- [ ] Create Event Mothers (if applicable)

### Use Case Tests
- [ ] {UseCase1}.test.ts
- [ ] {EventHandler1}.test.ts (for event subscribers)
- [ ] ... (list all use cases)

## Acceptance Criteria
- [ ] All Mother objects available (created or reused from CMA)
- [ ] Mock repository implements all repository interface methods
- [ ] Each use case has corresponding test file
- [ ] Event handler tests properly mock domain events
- [ ] All tests pass

## Notes
- CDA modules often have event handlers (e.g., `UpdateOnPublished`, `RemoveOnUnpublished`)
- These handlers should test that they correctly respond to domain events
- May need to create domain event mothers from CMA modules if not already available

## Files to Create
```
tests/contexts/cda/{module}/
├── domain/
│   └── {Module}Mother.ts (if needed)
├── infrastructure/
│   └── Mock{Module}Repository.ts
└── application/
    └── ... (test files for each use case)
```

## Related
- Reference: #[original issue number]
```

---

## Template for System Email Module

### Issue Title
```
test: add unit tests for System Email application use cases
```

### Issue Body
```markdown
## Context
This issue tracks the creation of unit tests for the System Email module's application use cases. This module handles sending various types of emails in response to system events.

## Scope
- **Module**: System Email
- **Use Cases**: 10 use cases (9 need tests, 1 exists)
- **Reference**: See `tests/contexts/system/email/application/send-welcome-email/` for existing pattern

## Tasks

### Infrastructure Setup
- [ ] Review existing Mother objects in `tests/contexts/system/email/domain/`
- [ ] Create additional Mother objects if needed:
  - [ ] ArchivedEmailMother
  - [ ] BlockedEmailMother
  - [ ] RestoredEmailMother
  - [ ] UserUpdatedNotificationEmailMother
- [ ] Verify MockEmailSender is complete

### Use Case Tests (9 remaining)
- [ ] ArchivedEmailSender.test.ts
- [ ] SendArchivedEmailOnUserArchived.test.ts
- [ ] BlockedEmailSender.test.ts
- [ ] SendBlockedEmailOnUserBlocked.test.ts
- [ ] RestoredEmailSender.test.ts
- [ ] SendRestoredEmailOnUserRestored.test.ts
- [ ] SendNotificationEmailOnUserEmailChanged.test.ts
- [ ] UserUpdatedNotificationEmailSender.test.ts
- [ ] Fix existing SendWelcomeEmailOnUserRegistered.test.ts (timestamp issue)

## Acceptance Criteria
- [ ] All email type Mother objects created
- [ ] Each use case has corresponding test file
- [ ] Event subscriber tests properly mock user domain events
- [ ] All tests pass (including fix for existing failing test)

## Notes
- Existing test `SendWelcomeEmailOnUserRegistered.test.ts` has timestamp/content mismatches
- Email senders react to user events (archived, blocked, restored, email changed, registered)
- Need to coordinate with User domain event mothers

## Files to Create/Fix
```
tests/contexts/system/email/
├── domain/
│   ├── ArchivedEmailMother.ts
│   ├── BlockedEmailMother.ts
│   ├── RestoredEmailMother.ts
│   └── UserUpdatedNotificationEmailMother.ts
└── application/
    ├── send-archived-email/
    │   ├── ArchivedEmailSender.test.ts
    │   └── SendArchivedEmailOnUserArchived.test.ts
    ├── ... (other email types)
    └── send-welcome-email/
        └── SendWelcomeEmailOnUserRegistered.test.ts (FIX)
```

## Related
- Reference: #[original issue number]
- Depends on: User module Mother objects
```

---

## Quick Reference: Priority Levels

**High Priority** (should be done first):
- CMA: Courses, Events, Guides, Schedules, Users (complete remaining)
- System: Email

**Medium Priority**:
- CMA: Guide Attachments, Schedule Attachments, UC
- CDA: All modules (Activities, Announcements, Courses, Events, Guides, UC)

**Low Priority**:
- CMA: Images
- CDA: Schedule

---

## Creating Issues in GitHub

You can create these issues using the GitHub CLI:

```bash
# For each module, create an issue like:
gh issue create \
  --title "test: add unit tests for CMA Courses application use cases" \
  --body-file issue-body.md \
  --label "testing,good-first-issue" \
  --assignee "@me"
```

Or use the GitHub web interface:
1. Go to repository → Issues → New Issue
2. Copy the appropriate template
3. Fill in module-specific details
4. Add labels: `testing`, `enhancement`, optionally `good-first-issue` for smaller modules
5. Create issue
