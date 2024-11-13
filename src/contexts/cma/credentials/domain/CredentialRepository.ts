import { CredentialExternalId } from "./CredentialExternalId";
import { CredentialId } from "./CredentialId";
import { DomainCredential } from "./DomainCredential";

export interface CredentialRepository {
	save(credential: DomainCredential): Promise<void>;
	search(credentialId: CredentialId): Promise<DomainCredential | null>;
	searchByExternalId(externalId: CredentialExternalId): Promise<DomainCredential | null>;
}
