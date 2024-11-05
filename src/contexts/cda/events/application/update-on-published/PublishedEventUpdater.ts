import { Service } from "diod";
import { EventRepository } from "../../domain/EventRepository";
import { EventId } from "../../domain/EventId";
import { Event } from "../../domain/Event";

@Service()
export class PublishedEventUpdater {
    constructor(
        private readonly repository: EventRepository,
    ) {}

    async update(
        id: string,
        name: string,
        location: string,
        startDate: string,
        endDate: string,
    ): Promise<void> {
        let event = await this.repository.search(new EventId(id));
        
        if (!event) {
            event = Event.create(
                id,
                name,
                location,
                startDate,
                endDate
            );
        } else {
            event.updateName(name);
            event.updateLocation(location);
            event.updateStartDate(startDate);
            event.updateEndDate(endDate);
        }

        await this.repository.save(event);
    }
}