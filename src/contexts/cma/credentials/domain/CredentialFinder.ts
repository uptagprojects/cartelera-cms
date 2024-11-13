import { CredentialDoesNotExist } from "./CredentialDoesNotExist";
import { CredentialExternalId } from "./CredentialExternalId";
import { CredentialId } from "./CredentialId";
import { CredentialRepository } from "./CredentialRepository";
import { DomainCredential } from "./DomainCredential";

export class CredentialFinder {
	constructor(private readonly repository: CredentialRepository) {}

	async find(id: string): Promise<DomainCredential> {
		const credential = await this.repository.search(new CredentialId(id));
		if (!credential) {
			throw new CredentialDoesNotExist();
		}

		return credential;
	}

	async findByExternalId(id: string): Promise<DomainCredential> {
		const credential = await this.repository.searchByExternalId(new CredentialExternalId(id));
		if (!credential) {
			throw new CredentialDoesNotExist();
		}

		return credential;
	}
}
