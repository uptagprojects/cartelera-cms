import { fa, faker } from "@faker-js/faker";
import { WelcomeEmail, WelcomeEmailPrimitives } from "../../../../../src/contexts/system/email/domain/WelcomeEmail";
import { UserEmailMother } from "../../../cma/users/domain/UserEmailMother";
import { UserNameMother } from "../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../shared/domain/EmailAddressMother";
import { EmailIdMother } from "./EmailIdMother";

type Params = Partial<WelcomeEmailPrimitives> & { userName: string, presenterName: string, presenterEmail: string, confirmationUrl: string };

export class WelcomeEmailMother {
    static create(params?: Params): WelcomeEmail {
        const userName = UserNameMother.create(params?.userName).value;
        const userEmail = UserEmailMother.create(params?.to).value;
        const presenterName = UserNameMother.create(params?.presenterName).value;
        const presenterEmail = UserEmailMother.create(params?.presenterEmail).value;
        const magicLink = params?.confirmationUrl ?? faker.internet.url();

        const primitives: WelcomeEmailPrimitives = {
            id: EmailIdMother.create().value,
            from: EmailAddressMother.create(WelcomeEmail.from).value,
            to: userEmail,
            subject: WelcomeEmail.generateSubject(userName).value,
            html: WelcomeEmail.generateHTML(
                userName,
                userEmail,
                presenterName,
                presenterEmail,
                magicLink
            ).value,
            text: WelcomeEmail.generateText(
                userName,
                userEmail,
                presenterName,
                presenterEmail,
                magicLink
            ).value,
            ...params
        };

        return WelcomeEmail.fromPrimitives(primitives);
    }
}
