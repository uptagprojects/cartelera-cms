import { ActivityContext } from "./ActivityContext";
import { ActivityId } from "./ActivityId";
import { ActivityPublishedDate } from "./ActivityPublishedDate";
import { ActivityTitle } from "./ActivityTitle";
import { ActivityType } from "./ActivityType";

export interface ActivityPrimitives {
    id: string;
    type: string;
    title: string;
    context: string;
    publishedDate: string;
}

export class Activity {
    constructor(
        public readonly id: ActivityId,
        public readonly type: ActivityType,
        public title: ActivityTitle,
        public context: ActivityContext,
        public readonly publishedDate: ActivityPublishedDate
    ) {}

    static create(id: string, type: string, title: string, context: string, publishedDate: Date): Activity {
        return new Activity(
            new ActivityId(id),
            type as ActivityType,
            new ActivityTitle(title),
            new ActivityContext(context),
            new ActivityPublishedDate(publishedDate)
        );
    }

    static fromPrimitives(primitives: ActivityPrimitives): Activity {
        return new Activity(
            new ActivityId(primitives.id),
            primitives.type as ActivityType,
            new ActivityTitle(primitives.title),
            new ActivityContext(primitives.context),
            new ActivityPublishedDate(new Date(primitives.publishedDate))
        );
    }

    updateTitle(title: string): void {
        this.title = new ActivityTitle(title);
    }

    updateContext(context: string): void {
        this.context = new ActivityContext(context);
    }

    toPrimitives(): ActivityPrimitives {
        return {
            id: this.id.value,
            type: this.type,
            title: this.title.value,
            context: this.context.value,
            publishedDate: this.publishedDate.value.toISOString()
        };
    }
}