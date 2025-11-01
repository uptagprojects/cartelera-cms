export class GuideDoesNotExist extends Error {
    constructor(id: string) {
        super(`The guide ${id} does not exist`);
    }
}
