import { UCCreatedDomainEvent } from "../../../../../../src/contexts/cma/uc/domain/events/UCCreatedDomainEvent";
import { UCPrimitives } from "../../../../../../src/contexts/cma/uc/domain/UC";
import { UCIdMother } from "../UCIdMother";
import { UCNameMother } from "../UCNameMother";

export class UCCreatedDomainEventMother {
	static create(params?: Partial<UCPrimitives>): UCCreatedDomainEvent {
		const primitives: UCPrimitives = {
			id: UCIdMother.create(params?.id).value,
			name: UCNameMother.create(params?.name).value
		};

		return new UCCreatedDomainEvent(primitives.id, primitives.name);
	}
}
