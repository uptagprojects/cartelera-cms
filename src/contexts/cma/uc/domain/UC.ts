import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UCCreatedDomainEvent } from "./event/UCCreatedDomainEvent";
import { UCRenamedDomainEvent } from "./event/UCRenamedDomainEvent";
import { UCId } from "./UCId";
import { UCName } from "./UCName";

export interface UCPrimitives {
	id: string;
	name: string;
}

export class UC extends AggregateRoot {
	constructor(
		private readonly id: UCId,
		private name: UCName
	) {
		super();
	}

	static create(id: string, name: string): UC {
		const uc = new UC(new UCId(id), new UCName(name));

		uc.record(new UCCreatedDomainEvent(id, name));

		return uc;
	}

	static fromPrimitives(primitives: UCPrimitives): UC {
		return new UC(new UCId(primitives.id), new UCName(primitives.name));
	}

	getId(): UCId {
		return this.id;
	}

	toPrimitives(): UCPrimitives {
		return {
			id: this.id.value,
			name: this.name.value
		};
	}

	rename(name: string): void {
		this.name = new UCName(name);
		this.record(new UCRenamedDomainEvent(this.id.value, name));
	}
}
