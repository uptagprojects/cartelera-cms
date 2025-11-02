import { UC, UCPrimitives } from "../../../../../src/contexts/cda/uc/domain/UC";
import { UCIdMother } from "./UCIdMother";
import { UCNameMother } from "./UCNameMother";
import { UCTotalGuidesMother } from "./UCTotalGuidesMother";

export class UCMother {
	static create(params?: Partial<UCPrimitives>): UC {
		const primitives: UCPrimitives = {
			id: UCIdMother.create().value,
			name: UCNameMother.create().value,
			totalGuides: UCTotalGuidesMother.create().value,
			...params
		};

		return UC.fromPrimitives(primitives);
	}
}
