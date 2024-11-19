export class TransactionalDecorator {
    static decorate<T>(decorated: T, connection: any): Promise<T> {
}