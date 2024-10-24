import { UserAvatar } from "./UserAvatar";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserStatus } from "./UserStatus";

export type UserPrimitives = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	status: string;
};

export class User {
	constructor(
		readonly id: UserId,
		readonly name: UserName,
		readonly email: UserEmail,
		readonly avatar: UserAvatar,
		readonly status: UserStatus
	) {}

	static create(id: string, name: string, email: string, avatar: string): User {
		const defaultUserStatus = UserStatus.Active;

		const user = new User(
			new UserId(id),
			new UserName(name),
			new UserEmail(email),
			new UserAvatar(avatar),
			defaultUserStatus
		);

		//user.record(new UserRegisteredDomainEvent(id, name, email, profilePicture, defaultUserStatus));

		return user;
	}

	static fromPrimitives(primitives: UserPrimitives): User {
		return new User(
			new UserId(primitives.id),
			new UserName(primitives.name),
			new UserEmail(primitives.email),
			new UserAvatar(primitives.avatar),
			primitives.status as UserStatus
		);
	}

	toPrimitives(): UserPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			avatar: this.avatar.value.toString(),
			status: this.status
		};
	}
}
