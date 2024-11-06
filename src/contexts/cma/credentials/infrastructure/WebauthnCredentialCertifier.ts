import type {
	PublicKeyCredentialWithAssertionJSON,
	PublicKeyCredentialWithAttestationJSON
} from "@github/webauthn-json";
import { verifyAuthenticationResponse, verifyRegistrationResponse } from "@simplewebauthn/server";
import { AuthenticationResponseJSON, RegistrationResponseJSON } from "@simplewebauthn/types";

import { CredentialCertifierVerificationError } from "../domain/CredentialCeritifierVerificationError";
import { CredentialCertifier } from "../domain/CredentialCertifier";
import { CredentialCertifierVerificationCredential } from "../domain/CredentialCertifierVerificationCredential";
import { DomainCredential } from "../domain/DomainCredential";

export interface WebauthnCredentialCertifierData {
	challenge: string;
	credential: PublicKeyCredentialWithAttestationJSON | PublicKeyCredentialWithAssertionJSON;
}

export class WebauthnCredentialCertifier
	implements CredentialCertifier<WebauthnCredentialCertifierData>
{
	private readonly settings = {
		expectedOrigin: process.env.CREDENTIAL_URL ?? "http://localhost:3000",
		expectedRPID: process.env.RPID ?? "localhost"
	};

	async create(
		certifierData: WebauthnCredentialCertifierData
	): Promise<CredentialCertifierVerificationCredential> {
		const verification = await verifyRegistrationResponse({
			response: certifierData.credential as RegistrationResponseJSON,
			expectedChallenge: certifierData.challenge,
			requireUserVerification: true,
			...this.settings
		});

		if (!verification.verified) {
			throw new CredentialCertifierVerificationError();
		}

		const verificationCredential = verification.registrationInfo?.credential;

		if (!verificationCredential) {
			throw new Error("Registration failed");
		}

		return {
			id: verificationCredential.id,
			publicKey: Buffer.from(verificationCredential.publicKey),
			signCount: verificationCredential.counter
		};
	}

	async verify(
		credentialData: WebauthnCredentialCertifierData,
		expected: DomainCredential
	): Promise<boolean> {
		const userCredential = expected.toPrimitives();

		const verification = await verifyAuthenticationResponse({
			response: credentialData.credential as AuthenticationResponseJSON,
			expectedChallenge: credentialData.challenge,
			requireUserVerification: true,
			credential: {
				id: userCredential.externalId,
				publicKey: Buffer.from(userCredential.publicKey, "base64"),
				counter: userCredential.signCount
			},
			...this.settings
		});

		expected.updateSignCount(verification.authenticationInfo.newCounter);

		return verification.verified;
	}
}
