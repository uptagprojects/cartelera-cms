import pino, { Bindings } from "pino";

import { Logger, LogValues } from "../../domain/telemetry/Logger";

export class PinoLogger implements Logger {
	private readonly pinoInstance: pino.Logger;
	constructor() {
		this.pinoInstance = pino();
	}

	debug(message: string, values?: LogValues): void {
		this.getLogger(values).debug(message);
	}

	error(message: string, values?: LogValues): void {
		this.getLogger(values).error(message);
	}

	info(message: string, values?: LogValues): void {
		this.getLogger(values).info(message);
	}

	warn(message: string, values?: LogValues): void {
		this.getLogger(values).warn(message);
	}

	private formatValues(logValues: LogValues): Bindings {
		if (logValues === undefined) {
			return {};
		}

		if (logValues instanceof Error) {
			return {
				name: logValues.name,
				message: logValues.message,
				stack: logValues.stack?.toString(),
			};
		}

		if (logValues instanceof Array) {
			return { values: JSON.stringify(logValues) };
		}

		if (logValues instanceof Object) {
			return Object.keys(logValues).reduce((acc, key) => {
				acc[key] = String((logValues as any)[key]);
				return acc;
			}, {} as { [key: string]: string | undefined });
		}

		return { value: String(logValues) };
	}

	private getLogger(values?: LogValues): pino.Logger {
		return this.pinoInstance.child(this.formatValues(values));
	}
}
