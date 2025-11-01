import { Service } from "diod";

import { Event } from "../../domain/Event";
import { EventId } from "../../domain/EventId";
import { EventRepository } from "../../domain/EventRepository";

@Service()
export class PublishedEventUpdater {
    constructor(private readonly repository: EventRepository) {}

    async update(id: string, name: string, location: string, startDate: string, endDate: string): Promise<void> {
        let event = await this.repository.search(new EventId(id));

        if (!event) {
            event = Event.create(id, name, location, startDate, endDate);
        } else {
            event.updateName(name);
            event.updateLocation(location);
            event.updateStartDate(startDate);
            event.updateEndDate(endDate);
        }

        await this.repository.save(event);
    }
}
