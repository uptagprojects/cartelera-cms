import { CourseDurationAcademicHours } from "./CourseDurationAcademicHours";
import { CourseDurationFinishDate } from "./CourseDurationFinishDate";
import { CourseDurationStartDate } from "./CourseDurationStartDate";

export type CourseDurationPrimitives = {
	startDate: string;
	finishDate: string;
	academicHours: number;
};

export class CourseDuration {
	constructor(
		readonly startDate: CourseDurationStartDate,
		readonly finishDate: CourseDurationFinishDate,
		readonly academicHours: CourseDurationAcademicHours
	) {}

	static fromPrimitives(primitives: CourseDurationPrimitives): CourseDuration {
		return new CourseDuration(
			new CourseDurationStartDate(new Date(primitives.startDate)),
			new CourseDurationFinishDate(new Date(primitives.finishDate)),
			new CourseDurationAcademicHours(primitives.academicHours)
		);
	}

	toPrimitives(): CourseDurationPrimitives {
		return {
			startDate: this.startDate.value.toISOString(),
			finishDate: this.finishDate.value.toISOString(),
			academicHours: this.academicHours.value
		};
	}
}
