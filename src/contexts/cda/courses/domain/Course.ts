import { CourseDuration } from "./CourseDuration";
import { CourseId } from "./CourseId";
import { CourseInstructorName } from "./CourseInstructorName";
import { CourseLocation } from "./CourseLocation";
import { CourseName } from "./CourseName";
import { CoursePicture } from "./CoursePicture";

export class Course {
	readonly id: CourseId;
	readonly name: CourseName;
	readonly duration: CourseDuration;
	readonly instructorName: CourseInstructorName;
	readonly picture: CoursePicture;
	readonly location: CourseLocation;

	constructor(
		id: CourseId,
		name: CourseName,
		duration: CourseDuration,
		instructorName: CourseInstructorName,
		picture: CoursePicture,
		location: CourseLocation
	) {
		this.id = id;
		this.name = name;
		this.duration = duration;
		this.instructorName = instructorName;
		this.picture = picture;
		this.location = location;
	}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		duration: number;
		instructorName: string;
		picture: string;
		location: string;
	}): Course {
		return new Course(
			new CourseId(plainData.id),
			new CourseName(plainData.name),
			new CourseDuration(plainData.duration),
			new CourseInstructorName(plainData.instructorName),
			new CoursePicture(plainData.picture),
			new CourseLocation(plainData.location)
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			duration: this.duration.value,
			instructorName: this.instructorName.value,
			picture: this.picture.value,
			location: this.location.value
		};
	}
}
