export class InvalidDateError extends Error {
    constructor(date: Date) {
        super(`${date.toISOString()} should not have hours, minutes, seconds nor milliseconds`);
    }
}
