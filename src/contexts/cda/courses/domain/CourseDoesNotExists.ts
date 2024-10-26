export class CourseDoesNotExists extends Error {
	constructor(id: string) {
		super(`Course ${id} does not exists`);
	}
}
