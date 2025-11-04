import {
	BlockedEmail,
	BlockedEmailPrimitives
} from "../../../../../src/contexts/system/email/domain/BlockedEmail";
import { UserIdMother } from "../../../cma/users/domain/UserIdMother";
import { UserNameMother } from "../../../cma/users/domain/UserNameMother";
import { EmailAddressMother } from "../../../shared/domain/EmailAddressMother";
import { EmailBodyMother } from "./EmailBodyMother";
import { EmailIdMother } from "./EmailIdMother";
import { EmailSubjectMother } from "./EmailSubjectMother";

export class BlockedEmailMother {
	static create(params?: Partial<BlockedEmailPrimitives>): BlockedEmail {
		const primitives: BlockedEmailPrimitives = {
			id: EmailIdMother.create().value,
			userId: UserIdMother.create().value,
			userName: UserNameMother.create().value,
			from: EmailAddressMother.create().value,
			to: EmailAddressMother.create().value,
			subject: EmailSubjectMother.create().value,
			body: EmailBodyMother.create().value,
			...params
		};

		return BlockedEmail.fromPrimitives(primitives);
	}
}
