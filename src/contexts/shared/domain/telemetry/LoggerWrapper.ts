import { Logger } from "./Logger";

export interface LoggerWrapper<T> {
    middleware(request: T): Promise<void>;

    controller<K>(
        fn: (
            req: T & {
                log: Logger;
            },
            context?: K
        ) => Promise<Response>
    ): (request: T, context?: K) => Promise<Response>;
}
