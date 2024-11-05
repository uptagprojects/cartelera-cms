import { NextRequest, NextResponse } from "next/server";

import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";
import { AllUCSearcher } from "../../../contexts/cda/uc/application/search-all/AllUCSearcher";
import { PostgresUCRepository } from "../../../contexts/cda/uc/infrastructure/PostgresUCRepository";

export async function GET(_: NextRequest): Promise<Response> {
	const searcher = new AllUCSearcher(
		new PostgresUCRepository(new PostgresConnection())
	);

	const ucs = await searcher.searchAll();

	return NextResponse.json(ucs.map(uc => uc.toPrimitives()));
}
