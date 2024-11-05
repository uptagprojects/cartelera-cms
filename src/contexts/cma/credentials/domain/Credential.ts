import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UserId } from "../../users/domain/UserId";
import { CredentialExternalId } from "./CredentialExternalId";
import { CredentialId } from "./CredentialId";
import { CredentialName } from "./CredentialName";
import { CredentialPublicKey } from "./CredentialPublicKey";
import { CredentialSignCount } from "./CredentialSignCount";

export interface CredentialPrimitives {
	id: string;
	userId: string;
	name: string;
	externalId: string; // this is unique
	publicKey: string;
	signCount: number;
}

export class Credential extends AggregateRoot {
	constructor(
		private readonly id: CredentialId,
		private readonly name: CredentialName,
		private readonly userId: UserId,
		private readonly externalId: CredentialExternalId,
		private readonly publicKey: CredentialPublicKey,
		private readonly signCount: CredentialSignCount
	) {
		super();
	}

	static fromPrimitives(credentialPrimitives: CredentialPrimitives): Credential {
		return new Credential(
			new CredentialId(credentialPrimitives.id),
			new CredentialName(credentialPrimitives.name),
			new UserId(credentialPrimitives.userId),
			new CredentialExternalId(credentialPrimitives.externalId),
			new CredentialPublicKey(credentialPrimitives.publicKey),
			new CredentialSignCount(credentialPrimitives.signCount)
		);
	}

	getId(): CredentialId {
		return this.id;
	}

	toPrimitives(): CredentialPrimitives {
		return {
			id: this.id.value,
			userId: this.userId.value,
			name: this.name.value,
			externalId: this.externalId.value,
			publicKey: this.publicKey.value,
			signCount: this.signCount.value
		};
	}
}
