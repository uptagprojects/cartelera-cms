import { UserRegisteredDomainEvent } from "../../../../../../src/contexts/cma/users/domain/event/UserRegisteredDomainEvent";
import { UserPrimitives } from "../../../../../../src/contexts/cma/users/domain/User";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { UserAvatarMother } from "../UserAvatarMother";
import { UserEmailMother } from "../UserEmailMother";
import { UserIdMother } from "../UserIdMother";
import { UserNameMother } from "../UserNameMother";

export class UserRegisteredDomainEventMother {
	static create(params?: Partial<UserPrimitives>): UserRegisteredDomainEvent {
		const primitives: UserPrimitives = {
			id: UserIdMother.create().value,
			name: UserNameMother.create().value,
			email: UserEmailMother.create().value,
			avatar: UserAvatarMother.create().value.toString(),
			status: UserStatus.ACTIVE,
			...params
		};

		return new UserRegisteredDomainEvent(
			primitives.id,
			primitives.name,
			primitives.email,
			primitives.avatar,
			primitives.status
		);
	}
}
