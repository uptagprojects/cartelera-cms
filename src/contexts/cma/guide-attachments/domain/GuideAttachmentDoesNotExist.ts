export class GuideAttachmentDoesNotExist extends Error {
	constructor(id: string) {
		super(`The guide attachment ${id} does not exist`);
	}
}
