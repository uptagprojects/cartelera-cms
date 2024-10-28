export class UCDoesNotExist extends Error {
	constructor(id: string) {
		super(`The area ${id} does not exist`);
	}
}
