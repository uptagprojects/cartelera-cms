import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UserArchivedDomainEvent } from "./event/UserArchivedDomainEvent";
import { UserAvatarUpdatedDomainEvent } from "./event/UserAvatarUpdatedDomainEvent";
import { UserBlockedDomainEvent } from "./event/UserBlockedDomainEvent";
import { UserConfirmedDomainEvent } from "./event/UserConfirmedDomainEvent";
import { UserEmailUpdatedDomainEvent } from "./event/UserEmailUpdatedDomainEvent";
import { UserNameUpdatedDomainEvent } from "./event/UserNameUpdatedDomainEvent";
import { UserRegisteredDomainEvent } from "./event/UserRegisteredDomainEvent";
import { UserRestoredDomainEvent } from "./event/UserRestoredDomainEvent";
import { UserAvatar } from "./UserAvatar";
import { UserEmail } from "./UserEmail";
import { UserEmailVerified } from "./UserEmailVerified";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserStatus } from "./UserStatus";

export type UserPrimitives = {
	id: string;
	name: string;
	email: string;
	emailVerified: Date | null;
	avatar: string;
	status: string;
};

export class User extends AggregateRoot {
	constructor(
		private readonly id: UserId,
		private name: UserName,
		private email: UserEmail,
		private avatar: UserAvatar,
		private status: UserStatus,
		private emailVerified?: UserEmailVerified
	) {
		super();
	}

	static create(id: string, name: string, email: string, avatar: string): User {
		const defaultUserStatus = UserStatus.PENDING_CONFIRMATION;

		const user = new User(
			new UserId(id),
			new UserName(name),
			new UserEmail(email),
			new UserAvatar(avatar),
			defaultUserStatus
		);

		user.record(new UserRegisteredDomainEvent(id, name, email, avatar, defaultUserStatus));

		return user;
	}

	static fromPrimitives(primitives: UserPrimitives): User {
		return new User(
			new UserId(primitives.id),
			new UserName(primitives.name),
			new UserEmail(primitives.email),
			new UserAvatar(primitives.avatar),
			primitives.status as UserStatus,
			primitives.emailVerified ? new UserEmailVerified(primitives.emailVerified) : undefined
		);
	}

	toPrimitives(): UserPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			avatar: this.avatar.value.toString(),
			status: this.status,
			emailVerified: this.emailVerified ? this.emailVerified.value : null
		};
	}

	getId(): string {
		return this.id.value;
	}

	isActive(): boolean {
		return this.status === UserStatus.ACTIVE;
	}

	updateEmail(email: string): void {
		this.email = new UserEmail(email);
		this.record(new UserEmailUpdatedDomainEvent(this.id.value, email));
	}

	updateName(name: string): void {
		this.name = new UserName(name);
		this.record(new UserNameUpdatedDomainEvent(this.id.value, name));
	}

	updateAvatar(avatar: string): void {
		this.avatar = new UserAvatar(avatar);
		this.record(new UserAvatarUpdatedDomainEvent(this.id.value, avatar));
	}

	confirm(name?: string, avatar?: string): void {
		this.status = UserStatus.ACTIVE;
		this.emailVerified = new UserEmailVerified(new Date());

		if (name && this.name.value.length < 1) {
			this.name = new UserName(name);
		}

		if (avatar) {
			this.avatar = new UserAvatar(avatar);
		}

		this.record(
			new UserConfirmedDomainEvent(
				this.id.value,
				this.name.value,
				this.avatar.value.toString()
			)
		);
	}

	archive(): void {
		this.status = UserStatus.ARCHIVED;
		this.record(new UserArchivedDomainEvent(this.id.value));
	}

	block(): void {
		this.status = UserStatus.BLOCKED;
		this.record(new UserBlockedDomainEvent(this.id.value));
	}

	restore(): void {
		this.status = UserStatus.ACTIVE;
		this.record(new UserRestoredDomainEvent(this.id.value));
	}

	verifyEmail(date: Date): void {
		this.emailVerified = new UserEmailVerified(date);
	}
}
