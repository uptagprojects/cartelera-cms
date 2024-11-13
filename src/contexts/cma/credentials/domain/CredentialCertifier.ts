import { CredentialCertifierVerificationCredential } from "./CredentialCertifierVerificationCredential";
import { DomainCredential } from "./DomainCredential";

export interface CredentialCertifier<T> {
	create(credentialData: T): Promise<CredentialCertifierVerificationCredential>;
	verify(credentialData: T, expected: DomainCredential): Promise<boolean>;
}
