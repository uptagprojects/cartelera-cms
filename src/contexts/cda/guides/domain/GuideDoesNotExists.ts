export class GuideDoesNotExists extends Error {
    constructor(id: string) {
        super(`Guide ${id} does not exists`);
    }
}
