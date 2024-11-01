import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { EventLocationUpdatedDomainEvent } from "./event/EventLocationUpdatedDomainEvent";
import { EventPublishedDomainEvent } from "./event/EventPublishedDomainEvent";
import { EventNameUpdatedDomainEvent } from "./event/EventNameUpdatedDomainEvent";
import { EventEndDate } from "./EventEndDate";
import { EventId } from "./EventId";
import { EventLocation } from "./EventLocation";
import { EventName } from "./EventName";
import { EventStartDate } from "./EventStartDate";
import { EventStartDateUpdatedDomainEvent } from "./event/EventStartDateUpdatedDomainEvent";
import { EventEndDateUpdatedDomainEvent } from "./event/EventEndDateUpdatedDomainEvent";


export interface EventPrimitives {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
}

export class Event extends AggregateRoot {
    constructor(
        private readonly id: EventId,
        private name: EventName,
        private location: EventLocation,
        private startDate: EventStartDate,
        private endDate: EventEndDate,
    ) {
        super();
    }

    static create(id: string, name: string, location: string, startDate: string, endDate: string): Event {

        const event = new Event(
            new EventId(id),
            new EventName(name),
            new EventLocation(location),
            new EventStartDate(startDate),
            new EventEndDate(endDate),
        );

        event.record(new EventPublishedDomainEvent(id, name, location, startDate, endDate));
        return event;
    }

    static fromPrimitives(primitives: EventPrimitives): Event {
        return new Event(
            new EventId(primitives.id),
            new EventName(primitives.name),
            new EventLocation(primitives.location),
            new EventStartDate(primitives.startDate),
            new EventEndDate(primitives.endDate),
        );
    }

    toPrimitives(): EventPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            location: this.location.value,
            startDate: this.startDate.value.toString(),
            endDate: this.endDate.value.toString(),
        }
    }

    updateName(name: string): void {
        this.name = new EventName(name);
        this.record(new EventNameUpdatedDomainEvent(this.id.value, name));
    }

    updateLocation(location: string): void {
        this.location = new EventLocation(location);
        this.record(new EventLocationUpdatedDomainEvent(this.id.value, location));
    }

    updateStartDate(startDate: string): void {
        this.startDate = new EventStartDate(startDate);
        this.record(new EventStartDateUpdatedDomainEvent(this.id.value, startDate));
    }

    updateEndDate(endDate: string): void {
        this.endDate = new EventEndDate(endDate);
        this.record(new EventEndDateUpdatedDomainEvent(this.id.value, endDate));
    }

}