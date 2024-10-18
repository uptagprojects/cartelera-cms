import { CourseCreation } from "./CourseCreation";
import { CourseDescription } from "./CourseDescription";
import { CourseDuration } from "./CourseDuration";
import { CourseFinishDate } from "./CourseFinishDate";
import { CourseId } from "./CourseId";
import { CourseLocation } from "./CourseLocation";
import { CourseName } from "./CourseName";
import { CoursePicture } from "./CoursePicture";
import { CoursePrice } from "./CoursePrice";
import { CourseStartDate } from "./CourseStartDate";
import { CourseUpdate } from "./CourseUpdate";

export type CoursePrimitives = {
	id: string;
	name: string;
	description: string;
	picture: string;
	location: string;
	duration: string;
	startDate: string;
	finishDate: string;
	price: number;
	creation: string;
	lastUpdate: string;
};

export class Course {
	readonly id: CourseId;
	readonly name: CourseName;
	readonly description: CourseDescription;
	readonly picture: CoursePicture;
	readonly location: CourseLocation;
	readonly duration: CourseDuration;
	readonly startDate: CourseStartDate;
	readonly finishDate: CourseFinishDate;
	readonly price: CoursePrice;
	readonly creation: CourseCreation;
	readonly lastUpdate: CourseUpdate;

	constructor(
		id: CourseId,
		name: CourseName,
		description: CourseDescription,
		picture: CoursePicture,
		location: CourseLocation,
		duration: CourseDuration,
		startDate: CourseStartDate,
		finishDate: CourseFinishDate,
		price: CoursePrice,
		creation: CourseCreation,
		lastUpdate: CourseUpdate
	) {
		this.id = id;
		this.name = name;
		this.description = description;
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
			new CourseDescription(plainData.description),
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

	private toPrimitives() {
		return {
			id: this.id.value,
			name: this.name.value,
			description: this.description.value,
			picture: this.picture.value,
			location: this.location.value,
			duration: this.duration.value,
			startDate: this.startDate.value,
			finishDate: this.finishDate.value,
			price: this.price.value,
			creation: this.creation.value,
			lastUpdate: this.lastUpdate.value
		};
	}
}
