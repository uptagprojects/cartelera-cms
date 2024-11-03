export class UCDoesNotExist extends Error {
	constructor(id: string) {
		super(`UC ${id} does not exist`);
	}
}
