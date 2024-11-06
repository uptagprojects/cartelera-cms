import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UserFinder } from "../../../users/domain/UserFinder";
import { CredentialCertifier } from "../../domain/CredentialCertifier";
import { CredentialFinder } from "../../domain/CredentialFinder";
import { CredentialRepository } from "../../domain/CredentialRepository";

export class CredentialAuthenticator<T> {
	private readonly finder: CredentialFinder;
	constructor(
		private readonly credentialCertifier: CredentialCertifier<T>,
		private readonly userFinder: UserFinder,
		private readonly repository: CredentialRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new CredentialFinder(repository);
	}

	async authenticate(
		id: string,
		email: string,
		credentialsWithPendingVerification: T
	): Promise<void> {
		const user = await this.userFinder.findByEmail(email);
		const dCredential = await this.finder.findByExternalId(id);
		const { userId } = dCredential.toPrimitives();

		const valid = await this.credentialCertifier.verify(
			credentialsWithPendingVerification,
			dCredential
		);

		await this.repository.save(dCredential);

		if (!valid || user.getId().value !== userId) {
			throw new Error("Invalid credentials");
		}

		// TO DO: implement domain event so email sender can subscribe to it
	}
}
