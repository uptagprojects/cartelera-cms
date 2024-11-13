import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UserFinder } from "../../../users/domain/UserFinder";
import { CredentialCertifier } from "../../domain/CredentialCertifier";
import { CredentialRepository } from "../../domain/CredentialRepository";
import { DomainCredential } from "../../domain/DomainCredential";

export class CredentialRegistrar<T> {
	constructor(
		private readonly credentialCertifier: CredentialCertifier<T>,
		private readonly userFinder: UserFinder,
		private readonly repository: CredentialRepository,
		private readonly eventBus: EventBus
	) {}

	async register(
		id: string,
		userId: string,
		credentialsWithPendingVerification: T
	): Promise<void> {
		const user = await this.userFinder.find(userId);
		const { email } = user.toPrimitives();

		const response = await this.credentialCertifier.create(credentialsWithPendingVerification);

		const credential = DomainCredential.create(
			id,
			email,
			userId,
			response.id,
			response.publicKey.toString("base64"),
			response.signCount
		);

		await this.repository.save(credential);
		await this.eventBus.publish(credential.pullDomainEvents());
	}
}
