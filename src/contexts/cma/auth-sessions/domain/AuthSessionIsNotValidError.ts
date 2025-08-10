export class AuthSessionIsNotValidError extends Error {
	constructor() {
		super(`Session is not valid`);
	}
}
