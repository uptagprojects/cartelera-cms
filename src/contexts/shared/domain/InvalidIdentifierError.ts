export class InvalidIdentifierError extends Error {
	constructor(id: string) {
		super(`${id} is not a valid identifier`);
	}
}
