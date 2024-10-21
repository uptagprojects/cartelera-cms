import { CourseAbstract } from "./CourseAbstract";
import { CourseAvailableSeats } from "./CourseAvailableSeats";
import { CourseCreation } from "./CourseCreation";
import { CourseDuration, CourseDurationPrimitives } from "./CourseDuration/CourseDuration";
import { CourseId } from "./CourseId";
import { CourseInstructor, CourseInstructorPrimitives } from "./CourseInstructor/CourseInstructor";
import { CourseLocation } from "./CourseLocation";
import { CourseName } from "./CourseName";
import { CoursePicture } from "./CoursePicture";
import { CoursePrice } from "./CoursePrice";
import { CourseUpdate } from "./CourseUpdate";

export type CoursePrimitives = {
	id: string;
	name: string;
	abstract: string;
	instructor: CourseInstructorPrimitives;
	picture: string;
	location: string;
	duration: CourseDurationPrimitives;
	price: number;
	creation: string;
	lastUpdate: string;
};

export class Course {
	constructor(
		readonly id: CourseId,
		readonly name: CourseName,
		readonly abstract: CourseAbstract,
		readonly picture: CoursePicture,
		readonly instructor: CourseInstructor,
		readonly location: CourseLocation,
		readonly duration: CourseDuration,
		readonly price: CoursePrice,
		readonly creation: CourseCreation,
		readonly lastUpdate: CourseUpdate
	) {}

	static fromPrimitives(primitives: CoursePrimitives): Course {
		return new Course(
			new CourseId(primitives.id),
			new CourseName(primitives.name),
			new CourseAbstract(primitives.abstract),
			new CoursePicture(primitives.picture),
			CourseInstructor.fromPrimitives(primitives.instructor),
			new CourseLocation(primitives.location),
			CourseDuration.fromPrimitives(primitives.duration),
			new CoursePrice(primitives.price),
			new CourseAvailableSeats(primitives.availableSeats),
			new CourseCreation(new Date(primitives.creation)),
			new CourseUpdate(new Date(primitives.lastUpdate))
		);
	}

	toPrimitives(): CoursePrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			abstract: this.abstract.value,
			instructor: this.instructor.toPrimitives(),
			picture: this.picture.value,
			location: this.location.value,
			duration: this.duration.toPrimitives(),
			price: this.price.value,
			creation: this.creation.value.toISOString(),
			lastUpdate: this.lastUpdate.value.toISOString()
		};
	}
}
