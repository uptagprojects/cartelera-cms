export class GuideAttachmentDoesNotExist extends Error {
	constructor(id: string) {
		super(`The attachment ${id} does not exist`);
	}
}
