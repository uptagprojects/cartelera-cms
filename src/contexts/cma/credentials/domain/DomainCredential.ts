import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UserId } from "../../users/domain/UserId";
import { CredentialExternalId } from "./CredentialExternalId";
import { CredentialId } from "./CredentialId";
import { CredentialName } from "./CredentialName";
import { CredentialPublicKey } from "./CredentialPublicKey";
import { CredentialSignCount } from "./CredentialSignCount";
import { CredentialRegisteredDomainEvent } from "./event/CredentialRegisteredDomainEvent";

export interface CredentialPrimitives {
	id: string;
	userId: string;
	name: string;
	externalId: string; // this is unique
	publicKey: string;
	signCount: number;
}

export class DomainCredential extends AggregateRoot {
	constructor(
		public readonly id: CredentialId,
		private readonly name: CredentialName,
		private readonly userId: UserId,
		private readonly externalId: CredentialExternalId,
		private readonly publicKey: CredentialPublicKey,
		private signCount: CredentialSignCount
	) {
		super();
	}

	static fromPrimitives(credentialPrimitives: CredentialPrimitives): DomainCredential {
		return new DomainCredential(
			new CredentialId(credentialPrimitives.id),
			new CredentialName(credentialPrimitives.name),
			new UserId(credentialPrimitives.userId),
			new CredentialExternalId(credentialPrimitives.externalId),
			new CredentialPublicKey(credentialPrimitives.publicKey),
			new CredentialSignCount(credentialPrimitives.signCount)
		);
	}

	static create(
		id: string,
		name: string,
		userId: string,
		externalId: string,
		publicKey: string,
		signCount: number
	): DomainCredential {
		const credential = new DomainCredential(
			new CredentialId(id),
			new CredentialName(name),
			new UserId(userId),
			new CredentialExternalId(externalId),
			new CredentialPublicKey(publicKey),
			new CredentialSignCount(signCount)
		);

		credential.record(new CredentialRegisteredDomainEvent(id));

		return credential;
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

	updateSignCount(signCount: number): void {
		this.signCount = new CredentialSignCount(signCount);
	}
}
