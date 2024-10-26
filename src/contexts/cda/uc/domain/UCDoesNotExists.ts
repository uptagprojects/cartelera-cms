export class UCDoesNotExists extends Error {
	constructor(id: string) {
		super(`UC ${id} does not exists`);
	}
}
