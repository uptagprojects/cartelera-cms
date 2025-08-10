export class AuthSessionDoesNotExistError extends Error {
	constructor() {
		super(`Session does not exist`);
	}
}
