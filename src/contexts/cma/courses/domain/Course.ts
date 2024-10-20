import { CourseAbstract } from "./CourseAbstract";
import { CourseCreation } from "./CourseCreation";
import { CourseDuration } from "./CourseDuration";
import { CourseFinishDate } from "./CourseFinishDate";
import { CourseId } from "./CourseId";
import { CourseInstructor, CourseInstructorPrimitives } from "./CourseInstructor/CourseInstructor";
import { CourseLocation } from "./CourseLocation";
import { CourseName } from "./CourseName";
import { CoursePicture } from "./CoursePicture";
import { CoursePrice } from "./CoursePrice";
import { CourseStartDate } from "./CourseStartDate";
import { CourseUpdate } from "./CourseUpdate";

export type CoursePrimitives = {
	id: string;
	name: string;
	abstract: string;
	instructor: CourseInstructorPrimitives;
	picture: string;
	location: string;
	duration: number;
	startDate: string;
	finishDate: string;
	price: number;
	creation: string;
	lastUpdate: string;
};

export class Course {
	constructor(
		readonly id: CourseId,
		readonly name: CourseName,
		readonly abstract: CourseAbstract,
		readonly instructor: CourseInstructor,
		readonly picture: CoursePicture,
		readonly location: CourseLocation,
		readonly duration: CourseDuration,
		readonly startDate: CourseStartDate,
		readonly finishDate: CourseFinishDate,
		readonly price: CoursePrice,
		readonly creation: CourseCreation,
		readonly lastUpdate: CourseUpdate
	) {
		this.id = id;
		this.name = name;
		this.abstract = abstract;
		this.instructor = instructor;
		this.picture = picture;
		this.location = location;
		this.duration = duration;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.price = price;
		this.creation = creation;
		this.lastUpdate = lastUpdate;
	}

	static fromPrimitives(plainData: CoursePrimitives): Course {
		return new Course(
			new CourseId(plainData.id),
			new CourseName(plainData.name),
			new CourseAbstract(plainData.abstract),
			CourseInstructor.fromPrimitives(plainData.instructor),
			new CoursePicture(plainData.picture),
			new CourseLocation(plainData.location),
			new CourseDuration(Number(plainData.duration)),
			new CourseStartDate(new Date(plainData.startDate)),
			new CourseFinishDate(new Date(plainData.finishDate)),
			new CoursePrice(plainData.price),
			new CourseCreation(new Date(plainData.creation)),
			new CourseUpdate(new Date(plainData.lastUpdate))
		);
	}

	private toPrimitives(): CoursePrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			abstract: this.abstract.value,
			instructor: this.instructor.toPrimitives(),
			picture: this.picture.value,
			location: this.location.value,
			duration: this.duration.value,
			startDate: this.startDate.value.toISOString(),
			finishDate: this.finishDate.value.toISOString(),
			price: this.price.value,
			creation: this.creation.value.toISOString(),
			lastUpdate: this.lastUpdate.value.toISOString()
		};
	}
}
