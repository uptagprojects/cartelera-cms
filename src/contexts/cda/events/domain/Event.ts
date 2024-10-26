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
	readonly id: EventId;
	readonly name: EventName;
	readonly location: EventLocation;
	readonly startDate: EventStartDate;
	readonly endDate: EventEndDate;

	constructor(
		id: EventId,
		name: EventName,
		location: EventLocation,
		startDate: EventStartDate,
		endDate: EventEndDate
	) {
		this.id = id;
		this.name = name;
		this.location = location;
		this.startDate = startDate;
		this.endDate = endDate;
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
			startDate: this.startDate.value.toString(),
			endDate: this.endDate.value.toString()
		};
	}
}
