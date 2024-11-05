import { Service } from "diod";
import { EventId } from "../../domain/EventId";
import { EventRepository } from "../../domain/EventRepository";

@Service()
export class UnpublishedEventRemover {
    constructor(private readonly repository: EventRepository) {}

    async remove(id: string): Promise<void> {
        const event = await this.repository.search(new EventId(id));
        if (event) {
            await this.repository.remove(event);
        }
    }
}