import { UserArchivedDomainEvent } from "../../../../../../src/contexts/cma/users/domain/events/UserArchivedDomainEvent";
import { UserPrimitives } from "../../../../../../src/contexts/cma/users/domain/User";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { UserAvatarMother } from "../UserAvatarMother";
import { UserEmailMother } from "../UserEmailMother";
import { UserEmailVerifiedMother } from "../UserEmailVerifiedMother";
import { UserIdMother } from "../UserIdMother";
import { UserNameMother } from "../UserNameMother";

export class UserArchivedDomainEventMother {
	static create(params?: Partial<UserPrimitives>): UserArchivedDomainEvent {
		const primitives: UserPrimitives = {
			id: UserIdMother.create(params?.id).value,
			name: UserNameMother.create(params?.name).value,
			email: UserEmailMother.create(params?.email).value,
			emailVerified: UserEmailVerifiedMother.create(params?.emailVerified ?? undefined).value,
			avatar: UserAvatarMother.create(params?.avatar).value.toString(),
			status: UserStatus.ARCHIVED
		};

		return new UserArchivedDomainEvent(primitives.id);
	}
}
