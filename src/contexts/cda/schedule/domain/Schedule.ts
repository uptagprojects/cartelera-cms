import { ScheduleEndDate } from "./ScheduleEndDate";
import { ScheduleId } from "./ScheduleId";
import { ScheduleStartDate } from "./ScheduleStartDate";

export interface SchedulePrimitives {
	id: string;
	startDate: string;
	endDate: string;
}

export class Schedule {
	constructor(
		private readonly id: ScheduleId,
		private readonly startDate: ScheduleStartDate,
		private readonly endDate: ScheduleEndDate
	) {}

	static fromPrimitives(primitives: SchedulePrimitives): Schedule {
		return new Schedule(
			new ScheduleId(primitives.id),
			new ScheduleStartDate(primitives.startDate),
			new ScheduleEndDate(primitives.endDate)
		);
	}

	getId(): ScheduleId {
		return this.id;
	}

	toPrimitives(): SchedulePrimitives {
		return {
			id: this.id.value,
			startDate: this.startDate.value.toISOString(),
			endDate: this.endDate.value.toISOString()
		};
	}
}
