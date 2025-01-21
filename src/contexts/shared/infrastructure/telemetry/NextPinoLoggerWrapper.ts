import { NextRequest } from "next/server";

import { LoggerWrapper } from "../../domain/telemetry/LoggerWrapper";
import { PinoLogger } from "./PinoLogger";

export class NextPinoLoggerWrapper implements LoggerWrapper<NextRequest> {
	controller<K>(
		fn: (req: NextRequest & { log: PinoLogger }, context?: K) => Promise<Response>
	): (request: NextRequest, context?: K) => Promise<Response> {
		return (request: NextRequest, context?: K) =>
			fn(
				Object.assign(request, {
					log: new PinoLogger()
				}),
				context
			);
	}

	async middleware(request: NextRequest): Promise<void> {
		const req = {
			origin: request.headers.get("origin"),
			forwardRef: request.headers.get("x-forwarded-for"),
			method: request.method,
			host: request.nextUrl.hostname,
			path: request.nextUrl.pathname,
			scheme: request.nextUrl.protocol.split(":")[0],
			referer: request.headers.get("Referer"),
			userAgent: request.headers.get("user-agent")
		};

		const log = new PinoLogger();
		log.info(`[${req.method}] ${req.path}`, req);

		return Promise.resolve();
	}
}
