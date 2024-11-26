import { Logger } from "./Logger";

export type RequestWithLogger<T> = T & {
	log: Logger;
};
