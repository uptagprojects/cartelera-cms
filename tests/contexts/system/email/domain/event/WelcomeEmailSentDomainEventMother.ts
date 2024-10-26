import { UserName } from "../../../../../../src/contexts/cma/users/domain/UserName";
import { WelcomeEmailSentDomainEvent } from "../../../../../../src/contexts/system/email/domain/event/WelcomeEmailSentDomainEvent";
import { WelcomeEmailPrimitives } from "../../../../../../src/contexts/system/email/domain/WelcomeEmail";
import { UserIdMother } from "../../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../../shared/domain/EmailAddressMother";
import { EmailBodyMother } from "../EmailBodyMother";
import { EmailIdMother } from "../EmailIdMother";
import { EmailSubjectMother } from "../EmailSubjectMother";

export class WelcomeEmailSentDomainEventMother {
    static create(params?: Partial<WelcomeEmailPrimitives>): WelcomeEmailSentDomainEvent {
        const primitives: WelcomeEmailPrimitives = {
            id: EmailIdMother.create().value,
            userId: UserIdMother.create().value,
            userName: UserNameMother.create().value,
            from: EmailAddressMother.create().value,
            to: EmailAddressMother.create().value,
            subject: EmailSubjectMother.create().value,
            body: EmailBodyMother.create().value,
            ...params
        }

        return new WelcomeEmailSentDomainEvent(
            primitives.id,
            primitives.userId,
            primitives.userName,
            primitives.from,
            primitives.to,
            primitives.subject,
            primitives.body
        );
    }
}