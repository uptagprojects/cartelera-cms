import { NextRequest } from "next/server";
import { AxiomRequest, Logger as AxiomLogger, withAxiom } from "next-axiom";

import { LoggerWrapper } from "../../domain/telemetry/LoggerWrapper";

export class NextAxiomLoggerWrapper implements LoggerWrapper<NextRequest> {
	controller<K>(
		fn: (req: AxiomRequest, context?: K) => Promise<Response>
	): (request: NextRequest, context?: K) => Promise<Response> {
		return async (request: NextRequest, context?: K): Promise<Response> => {
			return await withAxiom(fn)(request as AxiomRequest, context);
		};
	}

	async middleware(request: NextRequest): Promise<void> {
		const logger = new AxiomLogger();

		logger.middleware(request);

		return logger.flush();
	}
}
