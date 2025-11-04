import { UCRemovedDomainEvent } from "../../../../../../src/contexts/cma/uc/domain/events/UCRemovedDomainEvent";
import { UCPrimitives } from "../../../../../../src/contexts/cma/uc/domain/UC";
import { UCIdMother } from "../UCIdMother";
import { UCNameMother } from "../UCNameMother";

export class UCRemovedDomainEventMother {
	static create(params?: Partial<UCPrimitives>): UCRemovedDomainEvent {
		const primitives: UCPrimitives = {
			id: UCIdMother.create(params?.id).value,
			name: UCNameMother.create(params?.name).value
		};

		return new UCRemovedDomainEvent(primitives.id);
	}
}
