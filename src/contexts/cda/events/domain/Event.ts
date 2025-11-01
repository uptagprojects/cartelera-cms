import { EventEndDate } from "./EventEndDate";
import { EventId } from "./EventId";
import { EventLocation } from "./EventLocation";
import { EventName } from "./EventName";
import { EventStartDate } from "./EventStartDate";

export interface EventPrimitives {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
}

export class Event {
    constructor(
        private readonly id: EventId,
        private name: EventName,
        private location: EventLocation,
        private startDate: EventStartDate,
        private endDate: EventEndDate
    ) {}

    static create(id: string, name: string, location: string, startDate: string, endDate: string): Event {
        const event = new Event(
            new EventId(id),
            new EventName(name),
            new EventLocation(location),
            new EventStartDate(startDate),
            new EventEndDate(endDate)
        );

        return event;
    }

    static fromPrimitives(plainData: EventPrimitives): Event {
        return new Event(
            new EventId(plainData.id),
            new EventName(plainData.name),
            new EventLocation(plainData.location),
            new EventStartDate(plainData.startDate),
            new EventEndDate(plainData.endDate)
        );
    }

    toPrimitives(): EventPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            location: this.location.value,
            startDate: this.startDate.value.toISOString(),
            endDate: this.endDate.value.toISOString()
        };
    }

    updateName(name: string): void {
        this.name = new EventName(name);
    }

    updateLocation(location: string): void {
        this.location = new EventLocation(location);
    }

    updateStartDate(startDate: string): void {
        this.startDate = new EventStartDate(startDate);
    }

    updateEndDate(endDate: string): void {
        this.endDate = new EventEndDate(endDate);
    }
}
