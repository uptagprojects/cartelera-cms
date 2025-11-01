import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { ScheduleId } from "../../schedules/domain/ScheduleId";
import { ScheduleAttachmentUploadedDomainEvent } from "./event/ScheduleAttachmentUploadedDomainEvent";
import { ScheduleAttachmentId } from "./ScheduleAttachmentId";
import { ScheduleAttachmentMIMEType } from "./ScheduleAttachmentMIMEType";
import { ScheduleAttachmentName } from "./ScheduleAttachmentName";
import { ScheduleAttachmentSize } from "./ScheduleAttachmentSize";
import { ScheduleAttachmentStoragePath } from "./ScheduleAttachmentStoragePath";
import { ScheduleAttachmentURL } from "./ScheduleAttachmentURL";

export interface ScheduleAttachmentPrimitives {
    id: string;
    name: string;
    scheduleId: string;
    url: string;
    size: number;
    mimeType: string;
    storagePath: string;
}

export class ScheduleAttachment extends AggregateRoot {
    constructor(
        private readonly id: ScheduleAttachmentId,
        private readonly name: ScheduleAttachmentName,
        private readonly scheduleId: ScheduleId,
        private readonly url: ScheduleAttachmentURL,
        private readonly size: ScheduleAttachmentSize,
        private readonly mimeType: ScheduleAttachmentMIMEType,
        private readonly storagePath: ScheduleAttachmentStoragePath
    ) {
        super();
    }

    static create(
        id: string,
        name: string,
        scheduleId: string,
        url: string,
        size: number,
        mimeType: string,
        storagePath: string
    ): ScheduleAttachment {
        const attachment = new ScheduleAttachment(
            new ScheduleAttachmentId(id),
            new ScheduleAttachmentName(name),
            new ScheduleId(scheduleId),
            new ScheduleAttachmentURL(url),
            new ScheduleAttachmentSize(size),
            new ScheduleAttachmentMIMEType(mimeType),
            new ScheduleAttachmentStoragePath(storagePath)
        );

        attachment.record(
            new ScheduleAttachmentUploadedDomainEvent(id, name, scheduleId, url, size, mimeType, storagePath)
        );

        return attachment;
    }

    static fromPrimitives(primitives: ScheduleAttachmentPrimitives): ScheduleAttachment {
        return new ScheduleAttachment(
            new ScheduleAttachmentId(primitives.id),
            new ScheduleAttachmentName(primitives.name),
            new ScheduleId(primitives.scheduleId),
            new ScheduleAttachmentURL(primitives.url),
            new ScheduleAttachmentSize(primitives.size),
            new ScheduleAttachmentMIMEType(primitives.mimeType),
            new ScheduleAttachmentStoragePath(primitives.storagePath)
        );
    }

    toPrimitives(): ScheduleAttachmentPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            scheduleId: this.scheduleId.value,
            url: this.url.value.toString(),
            size: this.size.value,
            mimeType: this.mimeType.value,
            storagePath: this.storagePath.value
        };
    }
}
