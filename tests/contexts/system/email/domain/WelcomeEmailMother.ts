import { WelcomeEmail, WelcomeEmailPrimitives } from "../../../../../src/contexts/system/email/domain/WelcomeEmail";
import { UserEmailMother } from "../../../cma/users/domain/UserEmailMother";
import { UserIdMother } from "../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../shared/domain/EmailAddressMother";
import { EmailHTMLBodyMother } from "./EmailHTMLBodyMother";
import { EmailIdMother } from "./EmailIdMother";
import { EmailSubjectMother } from "./EmailSubjectMother";
import { EmailTextBodyMother } from "./EmailTextBodyMother";

export class WelcomeEmailMother {
    static create(params?: Partial<WelcomeEmailPrimitives>): WelcomeEmail {
        const primitives: WelcomeEmailPrimitives = {
            id: EmailIdMother.create().value,
            userId: UserIdMother.create().value,
            userName: UserNameMother.create().value,
            presenterName: UserNameMother.create().value,
            presenterEmailAddress: UserEmailMother.create().value,
            from: EmailAddressMother.create().value,
            to: EmailAddressMother.create().value,
            subject: EmailSubjectMother.create().value,
            html: EmailHTMLBodyMother.create().value,
            text: EmailTextBodyMother.create().value,
            ...params
        };

        return WelcomeEmail.fromPrimitives(primitives);
    }
}
