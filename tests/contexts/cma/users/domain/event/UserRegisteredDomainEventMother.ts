import { UserRegisteredDomainEvent } from "../../../../../../src/contexts/cma/users/domain/event/UserRegisteredDomainEvent";
import { UserPrimitives } from "../../../../../../src/contexts/cma/users/domain/User";
import { UserStatus } from "../../../../../../src/contexts/cma/users/domain/UserStatus";
import { UserAvatarMother } from "../UserAvatarMother";
import { UserEmailMother } from "../UserEmailMother";
import { UserEmailVerifiedMother } from "../UserEmailVerifiedMother";
import { UserIdMother } from "../UserIdMother";
import { UserNameMother } from "../UserNameMother";

export class UserRegisteredDomainEventMother {
    static create(registeredUserParams?: Partial<UserPrimitives>, presenterUserParams?: Partial<UserPrimitives>): UserRegisteredDomainEvent {
        const primitives: UserPrimitives = {
            id: UserIdMother.create().value,
            name: UserNameMother.create().value,
            email: UserEmailMother.create().value,
            emailVerified: UserEmailVerifiedMother.create().value,
            avatar: UserAvatarMother.create().value.toString(),
            status: UserStatus.ACTIVE,
            ...registeredUserParams
        };

        const presenterPrimitives: Pick<UserPrimitives, 'name' | 'email'> = {
            name: UserNameMother.create().value,
            email: UserEmailMother.create().value,
            ...presenterUserParams
        };

        return new UserRegisteredDomainEvent(
            primitives.id,
            primitives.name,
            primitives.email,
            primitives.avatar,
            primitives.status,
            presenterPrimitives.name,
            presenterPrimitives.email
        );
    }
}
