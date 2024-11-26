import { Logger as AxiomLogger } from "next-axiom";

import { Logger, LogValues } from "../../domain/telemetry/Logger";

export class NextAxiomLogger implements Logger {
	private readonly logger: AxiomLogger;

	constructor() {
		this.logger = new AxiomLogger();
	}

	private formatValues(logValues: LogValues): { [key: string]: string | undefined } {
		if (logValues === undefined) {
			return {};
		}

		if (logValues instanceof Error) {
			return {
				name: logValues.name,
				message: logValues.message,
				stack: logValues.stack?.toString()
			};
		}

		if (logValues instanceof Array) {
			return { values: JSON.stringify(logValues) };
		}

		if (logValues instanceof Object) {
			return Object.keys(logValues).reduce(
				(acc, key) => {
					acc[key] = String((logValues as any)[key]);

					return acc;
				},
				{} as { [key: string]: string | undefined }
			);
		}

		return { value: String(logValues) };
	}

	debug(message: string, values?: LogValues): void {
		this.logger.debug(message, this.formatValues(values));
	}

	error(message: string, values?: LogValues): void {
		this.logger.error(message, this.formatValues(values));
	}

	info(message: string, values?: LogValues): void {
		this.logger.info(message, this.formatValues(values));
	}

	warn(message: string, values?: LogValues): void {
		this.logger.warn(message, this.formatValues(values));
	}
}
