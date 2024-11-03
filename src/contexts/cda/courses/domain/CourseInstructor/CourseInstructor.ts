import { CourseInstructorAvatar } from "./CourseInstructorAvatar";
import { CourseInstructorBadge } from "./CourseInstructorBadge";
import { CourseInstructorName } from "./CourseInstructorName";
import { CourseInstructorRelatedUrl } from "./CourseInstructorRelatedUrl";

export type CourseInstructorPrimitives = {
	name: string;
	badge: string;
	avatar: string;
	relatedUrl: string;
};

export class CourseInstructor {
	constructor(
		readonly name: CourseInstructorName,
		readonly badge: CourseInstructorBadge,
		readonly avatar: CourseInstructorAvatar,
		readonly relatedUrl: CourseInstructorRelatedUrl
	) {}

	static fromPrimitives(plainData: CourseInstructorPrimitives): CourseInstructor {
		return new CourseInstructor(
			new CourseInstructorName(plainData.name),
			new CourseInstructorBadge(plainData.badge),
			new CourseInstructorAvatar(plainData.avatar),
			new CourseInstructorRelatedUrl(plainData.relatedUrl)
		);
	}

	toPrimitives(): CourseInstructorPrimitives {
		return {
			name: this.name.value,
			badge: this.badge.value,
			avatar: this.avatar.value.toString(),
			relatedUrl: this.relatedUrl.value.toString()
		};
	}
}
