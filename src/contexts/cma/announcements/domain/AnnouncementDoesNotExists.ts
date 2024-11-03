export class AnnouncementDoesNotExists extends Error {
	constructor(id: string) {
		super(`Announcement ${id} does not exists`);
	}
}
