export class CredentialDoesNotExist extends Error {
	constructor() {
		super(`Credentials not found`);
	}
}
