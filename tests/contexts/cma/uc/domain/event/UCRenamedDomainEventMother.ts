import { UCRenamedDomainEvent } from "../../../../../../src/contexts/cma/uc/domain/events/UCRenamedDomainEvent";
import { UCPrimitives } from "../../../../../../src/contexts/cma/uc/domain/UC";
import { UCIdMother } from "../UCIdMother";
import { UCNameMother } from "../UCNameMother";

export class UCRenamedDomainEventMother {
	static create(params?: Partial<UCPrimitives>): UCRenamedDomainEvent {
		const primitives: UCPrimitives = {
			id: UCIdMother.create(params?.id).value,
			name: UCNameMother.create(params?.name).value
		};

		return new UCRenamedDomainEvent(primitives.id, primitives.name);
	}
}
