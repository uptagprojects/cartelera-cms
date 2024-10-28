import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UserId } from "../../users/domain/UserId";
import { AuthOTP } from "./AuthOTP";
import { AuthPassword } from "./AuthPassword";
import { AuthPasswordUpdatedDomainEvent } from "./event/AuthPasswordUpdatedDomainEvent";

export interface AuthPrimitives {
	userId: string;
	password: string;
	otp: string;
}

export class Auth extends AggregateRoot {
	constructor(
		private readonly userId: UserId,
		private password: AuthPassword,
		private readonly otp: AuthOTP
	) {
		super();
	}

	static fromPrimitives(userId: string, password: string, otp: string): Auth {
		return new Auth(new UserId(userId), new AuthPassword(password), new AuthOTP(otp));
	}

	toPrimitives(): AuthPrimitives {
		return {
			userId: this.userId.value,
			password: this.password.value,
			otp: this.otp.value
		};
	}

	updatePassword(password: string): void {
		this.password = new AuthPassword(password);

		this.record(new AuthPasswordUpdatedDomainEvent(this.userId.value));
	}

	comparePassword(password: AuthPassword): boolean {
		return password.value === this.password.value;
	}
}
