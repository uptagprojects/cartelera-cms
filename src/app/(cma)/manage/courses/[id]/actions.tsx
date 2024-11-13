import { z } from "zod";

export const useGetCourseDetails = async (id: string) => {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
	let data = null;
	try {
		const res = await fetch(`${base}/api/manage/courses/${id}`);
		if (res.status === 404) {
			data = {
				id: "",
				name: "",
				abstract: "",
				status: "draft",
				location: "",
				duration: {
					startDate: null,
					finishDate: null,
					academicHours: 0
				},
				instructor: {
					name: "",
					badge: "",
					email: "",
					avatar: "",
					relatedUrl: ""
				}
			};

			return data;
		}
		if (res.status === 200) {
			data = await res.json();

			return data;
		}

		throw new Error("An error occurred while fetching the course");
	} catch (error) {
		console.error(error);
	}
};

const saveCourseSchema = z.object({
	id: z
		.string({
			invalid_type_error: "Invalid id"
		})
		.uuid({ message: "This field needs an uuid" }),
	name: z
		.string({
			invalid_type_error: "Invalid name"
		})
		.min(1, { message: "This field has to be filled." }),
	abstract: z
		.string({
			invalid_type_error: "Invalid abstract"
		})
		.min(1, { message: "This field has to be filled." }),
	location: z
		.string({
			invalid_type_error: "Invalid location"
		})
		.min(1, { message: "This field has to be filled." }),
	startDate: z.date(),
	finishDate: z.date(),
	academicHours: z
		.number({
			invalid_type_error: "Invalid academic hours"
		})
		.min(1, { message: "Minimal academic hours needed. " }),
	instructorName: z
		.string({
			invalid_type_error: "Invalid location"
		})
		.min(1, { message: "This field has to be filled." }),
	instructorBadge: z
		.string({
			invalid_type_error: "Invalid badge"
		})
		.min(1, { message: "This field has to be filled." }),
	instructorEmail: z
		.string({
			invalid_type_error: "Invalid location"
		})
		.email({ message: "Instructor email has to be filled." }),
	instructorAvatar: z
		.string({
			invalid_type_error: "Invalid location"
		})
		.url({ message: "Instructor avatar is needed for aesthetic purposes." }),
	instructorRelatedUrl: z
		.string({
			invalid_type_error: "Invalid related url"
		})
		.url({ message: "Instructor social media profile is needed for aesthetic purposes." })
});

export async function saveCourse(_state: {}, formData: FormData) {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
	const validatedFields = saveCourseSchema.safeParse({
		id: formData.get("id"),
		name: formData.get("name"),
		abstract: formData.get("abstract"),
		location: formData.get("location"),
		startDate: formData.get("startDate"),
		finishDate: formData.get("finishDate"),
		academicHours: formData.get("academicHours"),
		instructorName: formData.get("instructorName"),
		instructorBadge: formData.get("instructorBadge"),
		instructorEmail: formData.get("instructorEmail"),
		instructorAvatar: formData.get("instructorAvatar"),
		instructorRelatedUrl: formData.get("instructorRelatedUrl")
	});

	if (!validatedFields.success) {
		return validatedFields.error.flatten().fieldErrors;
	}

	const body = JSON.stringify({
		id: validatedFields.data.id,
		name: validatedFields.data.name,
		abstract: validatedFields.data.abstract,
		location: validatedFields.data.location,
		duration: {
			startDate: validatedFields.data.startDate,
			finishDate: validatedFields.data.finishDate,
			academicHours: validatedFields.data.academicHours
		},
		instructor: {
			name: validatedFields.data.instructorName,
			badge: validatedFields.data.instructorBadge,
			email: validatedFields.data.instructorEmail,
			avatar: validatedFields.data.instructorAvatar,
			relatedUrl: validatedFields.data.instructorRelatedUrl
		}
	});

	const res = await fetch(`${base}/api/manage/courses/${formData.get("id") as string}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return {};
}
