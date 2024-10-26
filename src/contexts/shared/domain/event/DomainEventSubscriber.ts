import { DomainEvent } from "./DomainEvent";
import { DomainEventName } from "./DomainEventName";

export interface DomainEventSubscriber<T extends DomainEvent> {
	on(event: T): Promise<void>;
	subscribedTo(): DomainEventName<T>[];
	name(): string;
}
