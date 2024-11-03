import { DomainEvent } from "../../../../shared/domain/event/DomainEvent";

export class CdaGuideDomainEvent extends DomainEvent {
	static eventName = "pnfi.cda.guide.*";

	constructor(
		eventName: string,
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(eventName, id, eventId, occurredOn);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id
		};
	}
}
