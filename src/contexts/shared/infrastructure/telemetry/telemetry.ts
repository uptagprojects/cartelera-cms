import { NextRequest } from "next/server";

import { Logger } from "../../domain/telemetry/Logger";
import { LoggerWrapper } from "../../domain/telemetry/LoggerWrapper";
import { NextAxiomLogger } from "./NextAxiomLogger";
import { NextAxiomLoggerWrapper } from "./NextAxiomLoggerWrapper";
import { NextPinoLoggerWrapper } from "./NextPinoLoggerWrapper";
import { PinoLogger } from "./PinoLogger";

export const logger: Logger = process.env.NODE_ENV === "production" ? new NextAxiomLogger() : new PinoLogger();

export const loggerWrapper: LoggerWrapper<NextRequest> =
    process.env.NODE_ENV === "production" ? new NextAxiomLoggerWrapper() : new NextPinoLoggerWrapper();
