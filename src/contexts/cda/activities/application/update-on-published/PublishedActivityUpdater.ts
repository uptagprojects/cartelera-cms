import { Service } from "diod";
import { MarkdownRemover } from "../../../../shared/domain/MarkdownRemover";
import { Activity } from "../../domain/Activity";
import { ActivityId } from "../../domain/ActivityId";
import { ActivityRepository } from "../../domain/ActivityRepository";

@Service()
export class PublishedActivityUpdater {
    constructor(
        private readonly repository: ActivityRepository,
        private readonly mdRemover: MarkdownRemover
    ) {}

    async update(id: string, type: string, title: string, context: string, occurredOn: Date): Promise<void> {
        let activity = await this.repository.search(new ActivityId(id));
        
        if (!activity) {
            activity = Activity.create(id, type, title, await this.mdRemover.remove(context), occurredOn);
        } else {
            activity.updateTitle(title);
            activity.updateContext(context);
        }

        await this.repository.save(activity);
    }
}