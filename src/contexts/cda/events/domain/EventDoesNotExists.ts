export class EventDoesNotExists extends Error {
    constructor(id: string) {
        super(`Event ${id} does not exists`);
    }
}
