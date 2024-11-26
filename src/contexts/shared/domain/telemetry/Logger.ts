export type LogValues =  unknown;

export interface Logger {
	debug(message: string, values?: LogValues): void;
	error(message: string, values?: LogValues): void;
	info(message: string, values?: LogValues): void;
	warn(message: string, values?: LogValues): void;
}
