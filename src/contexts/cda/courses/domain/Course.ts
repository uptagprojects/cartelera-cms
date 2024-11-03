import { CourseAbstract } from "./CourseAbstract";
import { CourseDuration, CourseDurationPrimitives } from "./CourseDuration/CourseDuration";
import { CourseId } from "./CourseId";
import { CourseInstructor, CourseInstructorPrimitives } from "./CourseInstructor/CourseInstructor";
import { CourseLocation } from "./CourseLocation";
import { CourseName } from "./CourseName";
import { CoursePicture } from "./CoursePicture";
import { CoursePrice } from "./CoursePrice";

export interface CdaCoursePrimitives {
	id: string;
	name: string;
	abstract: string;
	instructor: CourseInstructorPrimitives;
	picture: string;
	location: string;
	duration: CourseDurationPrimitives;
	price: number;
}

export class Course {
	readonly id: CourseId;
	readonly name: CourseName;
	readonly abstract: CourseAbstract;
	readonly instructor: CourseInstructor;
	readonly picture: CoursePicture;
	readonly location: CourseLocation;
	readonly duration: CourseDuration;
	readonly price: CoursePrice;

	constructor(
		id: CourseId,
		name: CourseName,
		abstract: CourseAbstract,
		instructor: CourseInstructor,
		picture: CoursePicture,
		location: CourseLocation,
		duration: CourseDuration,
		price: CoursePrice
	) {
		this.id = id;
		this.name = name;
		this.abstract = abstract;
		this.instructor = instructor;
		this.picture = picture;
		this.location = location;
		this.duration = duration;
		this.price = price;
	}

	static fromPrimitives(plainData: CdaCoursePrimitives): Course {
		return new Course(
			new CourseId(plainData.id),
			new CourseName(plainData.name),
			new CourseAbstract(plainData.abstract),
			CourseInstructor.fromPrimitives(plainData.instructor),
			new CoursePicture(plainData.picture),
			new CourseLocation(plainData.location),
			CourseDuration.fromPrimitives(plainData.duration),
			new CoursePrice(plainData.price)
		);
	}

	toPrimitives(): CdaCoursePrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			abstract: this.abstract.value,
			instructor: this.instructor.toPrimitives(),
			picture: this.picture.value,
			location: this.location.value,
			duration: this.duration.toPrimitives(),
			price: this.price.value
		};
	}
}
