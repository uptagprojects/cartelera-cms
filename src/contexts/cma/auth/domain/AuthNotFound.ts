export class AuthNotFound extends Error {
	constructor(id: string) {
		super(`The user ${id} has no authentication method`);
	}
}
