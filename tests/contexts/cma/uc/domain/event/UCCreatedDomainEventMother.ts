import { UCCreatedDomainEvent } from "../../../../../../src/contexts/cma/uc/domain/event/UCCreatedDomainEvent";
import { UCPrimitives } from "../../../../../../src/contexts/cma/uc/domain/UC";
import { UCIdMother } from "../UCIdMother";
import { UCNameMother } from "../UCNameMother";

export class UCCreatedDomainEventMother {
	static create(params?: Partial<UCPrimitives>): UCCreatedDomainEvent {
		const primitives: UCPrimitives = {
			id: UCIdMother.create().value,
			name: UCNameMother.create().value,
			...params
		};

		return new UCCreatedDomainEvent(primitives.id, primitives.name);
	}
}
