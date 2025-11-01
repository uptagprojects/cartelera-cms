export class ScheduleDoesNotExist extends Error {
    constructor(id: string) {
        super(`The schedule ${id} does not exist`);
    }
}
