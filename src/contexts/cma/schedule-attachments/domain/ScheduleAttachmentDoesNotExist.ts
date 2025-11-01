export class ScheduleAttachmentDoesNotExist extends Error {
    constructor(id: string) {
        super(`The schedule attachment ${id} does not exist`);
    }
}
