import { CourseDurationFinishDate } from "./CourseDurationFinishDate";
import { CourseDurationStartDate } from "./CourseDurationStartDate";
import { CourseDurationTotalHour } from "./CourseDurationTotalHour";

export type CourseDurationPrimitives = {
	startDate: string;
	finishDate: string;
	totalHours: number;
};

export class CourseDuration {
	constructor(
		readonly startDate: CourseDurationStartDate,
		readonly finishDate: CourseDurationFinishDate,
		readonly totalHours: CourseDurationTotalHour
	) {}

	static fromPrimitives(primitives: CourseDurationPrimitives): CourseDuration {
		return new CourseDuration(
			new CourseDurationStartDate(new Date(primitives.startDate)),
			new CourseDurationFinishDate(new Date(primitives.finishDate)),
			new CourseDurationTotalHour(primitives.totalHours)
		);
	}

	toPrimitives(): CourseDurationPrimitives {
		return {
			startDate: this.startDate.value.toISOString(),
			finishDate: this.finishDate.value.toISOString(),
			totalHours: this.totalHours.value
		};
	}
}
