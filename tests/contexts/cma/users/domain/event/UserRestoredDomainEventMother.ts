import { UserRestoredDomainEvent } from "../../../../../../src/contexts/cma/users/domain/events/UserRestoredDomainEvent";
import { UserPrimitives } from "../../../../../../src/contexts/cma/users/domain/User";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { UserAvatarMother } from "../UserAvatarMother";
import { UserEmailMother } from "../UserEmailMother";
import { UserEmailVerifiedMother } from "../UserEmailVerifiedMother";
import { UserIdMother } from "../UserIdMother";
import { UserNameMother } from "../UserNameMother";

export class UserRestoredDomainEventMother {
	static create(params?: Partial<UserPrimitives>): UserRestoredDomainEvent {
		const primitives: UserPrimitives = {
			id: UserIdMother.create(params?.id).value,
			name: UserNameMother.create(params?.name).value,
			email: UserEmailMother.create(params?.email).value,
			emailVerified: UserEmailVerifiedMother.create(params?.emailVerified ?? undefined).value,
			avatar: UserAvatarMother.create(params?.avatar).value.toString(),
			status: UserStatus.ARCHIVED
		};

		return new UserRestoredDomainEvent(primitives.id);
	}
}
