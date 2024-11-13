import { NextRequest, NextResponse } from "next/server";

import { AllUCSearcher } from "../../../../contexts/cma/uc/application/search-all/AllUCSearcher";
import { PostgresUCRepository } from "../../../../contexts/cma/uc/infrastructure/PostgresUCRepository";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(_: NextRequest): Promise<Response> {
	const searcher = new AllUCSearcher(new PostgresUCRepository(new PostgresConnection()));

	const ucs = await searcher.searchAll();

	return NextResponse.json(ucs.map(uc => uc.toPrimitives()));
}
