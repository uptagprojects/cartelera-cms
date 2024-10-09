import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export type UserPrimitives = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export class User {
	readonly id: UserId;
	readonly name: UserName;
	readonly email: UserEmail;
	readonly password: UserPassword;

	constructor(id: UserId, name: UserName, email: UserEmail, password: UserPassword) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	static fromPrimitives(primitives: UserPrimitives): User {
		return new User(
			new UserId(primitives.id),
			new UserName(primitives.name),
			new UserEmail(primitives.email),
			new UserPassword(primitives.password)
		);
	}

	toPrimitives(): UserPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			password: "".padStart(16, " ")
		};
	}
}
