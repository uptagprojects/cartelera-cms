import { Guide, GuidePrimitives } from "../../../../../src/contexts/cma/guides/domain/Guide";
import { GuideStatus } from "../../../../../src/contexts/cma/guides/domain/GuideStatus";
import { UCIdMother } from "../../uc/domain/UCIdMother";
import { UserIdMother } from "../../users/domain/UserIdMother";
import { GuideContentMother } from "./GuideContentMother";
import { GuideIdMother } from "./GuideIdMother";
import { GuideTitleMother } from "./GuideTitleMother";

export class GuideMother {
	static create(params?: Partial<GuidePrimitives>): Guide {
		const primitives: GuidePrimitives = {
			id: GuideIdMother.create().value,
			title: GuideTitleMother.create().value,
			content: GuideContentMother.create().value,
			ucId: UCIdMother.create().value,
			authorId: UserIdMother.create().value,
			status: GuideStatus.DRAFT,
			...params
		};

		return Guide.fromPrimitives(primitives);
	}
}
