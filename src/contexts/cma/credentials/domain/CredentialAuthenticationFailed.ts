export class CredentialAuthenticationFailed extends Error {
	constructor() {
		super(`Authentication failed`);
	}
}
