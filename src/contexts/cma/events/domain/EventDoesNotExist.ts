export class EventDoesNotExist extends Error {
	constructor(id: string) {
		super(`The event ${id} does not exist`);
	}
}
