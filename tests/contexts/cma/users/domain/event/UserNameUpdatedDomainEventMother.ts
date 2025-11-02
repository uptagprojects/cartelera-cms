import { UserNameUpdatedDomainEvent } from "../../../../../../src/contexts/cma/users/domain/event/UserNameUpdatedDomainEvent";
import { UserPrimitives } from "../../../../../../src/contexts/cma/users/domain/User";
import { UserAvatarMother } from "../UserAvatarMother";
import { UserEmailMother } from "../UserEmailMother";
import { UserEmailVerifiedMother } from "../UserEmailVerifiedMother";
import { UserIdMother } from "../UserIdMother";
import { UserNameMother } from "../UserNameMother";
import { UserStatusMother } from "../UserStatusMother";

export class UserNameUpdatedDomainEventMother {
	static create(params: Partial<UserPrimitives> = {}): UserNameUpdatedDomainEvent {
		const primitives: UserPrimitives = {
			id: UserIdMother.create(params.id).value,
			name: UserNameMother.create(params.name).value,
			email: UserEmailMother.create(params.email).value,
			emailVerified: UserEmailVerifiedMother.create(params.emailVerified ?? undefined).value,
			avatar: UserAvatarMother.create(params.avatar).value.toString(),
			status: params.status ?? UserStatusMother.create()
		};

		return new UserNameUpdatedDomainEvent(primitives.id, primitives.name);
	}
}
