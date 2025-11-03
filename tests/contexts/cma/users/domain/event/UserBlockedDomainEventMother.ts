import { UserBlockedDomainEvent } from "../../../../../../src/contexts/cma/users/domain/events/UserBlockedDomainEvent";
import { UserPrimitives } from "../../../../../../src/contexts/cma/users/domain/User";
import { UserAvatarMother } from "../UserAvatarMother";
import { UserEmailMother } from "../UserEmailMother";
import { UserEmailVerifiedMother } from "../UserEmailVerifiedMother";
import { UserIdMother } from "../UserIdMother";
import { UserNameMother } from "../UserNameMother";
import { UserStatusMother } from "../UserStatusMother";

export class UserBlockedDomainEventMother {
	static create(params: Partial<UserPrimitives> = {}): UserBlockedDomainEvent {
		const primitives: UserPrimitives = {
			id: UserIdMother.create(params.id).value,
			name: UserNameMother.create(params.name).value,
			email: UserEmailMother.create(params.email).value,
			emailVerified: UserEmailVerifiedMother.create(params.emailVerified ?? undefined).value,
			avatar: UserAvatarMother.create(params.avatar).value.toString(),
			status: params.status ?? UserStatusMother.create()
		};

		return new UserBlockedDomainEvent(primitives.id);
	}
}
