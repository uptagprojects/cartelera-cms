import { NextResponse } from "next/server";

import { DomainError } from "../../domain/DomainError";
import { HTTPNextResponse } from "./HTTPNextResponse";

export async function executeWithMappedErrorHandling(
	fn: () => Promise<NextResponse>,
	errorMap: Record<string, number> = {}
): Promise<NextResponse> {
	try {
		return await fn();
	} catch (error: unknown) {
		if (error instanceof DomainError && errorMap[error.constructor.name]) {
			return HTTPNextResponse.domainError(error, errorMap[error.constructor.name]);
		}

		return HTTPNextResponse.internalServerError();
	}
}
