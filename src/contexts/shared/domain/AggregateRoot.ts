import { DomainEvent } from "./event/DomainEvent";

export abstract class AggregateRoot {
    public domainEvents: DomainEvent[] = [];

    pullDomainEvents(): DomainEvent[] {
        const domainEvents = this.domainEvents;
        this.domainEvents = [];
        return domainEvents;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }
}