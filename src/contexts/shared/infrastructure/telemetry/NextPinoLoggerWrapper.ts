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

	async middleware(_: NextRequest): Promise<void> {
		return Promise.resolve();
	}
}
