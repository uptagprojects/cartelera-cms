import { z } from "zod";

export const useGetAnnouncementDetails = async (id: string) => {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
	let data = null;
	try {
		const res = await fetch(`${base}/api/manage/announcements/${id}`);
		if (res.status === 404) {
			data = {
				id: "",
				title: "",
				content: "",
				publishDate: "",
				type: "info",
				status: "draft"
			};

			return data;
		}
		if (res.status === 200) {
			data = await res.json();

			return data;
		}

		throw new Error("An error occurred while fetching the announcement");
	} catch (error) {
		console.error(error);
	}
};

const saveAnnouncementSchema = z.object({
	title: z
		.string({
			invalid_type_error: "Invalid title"
		})
		.min(1, { message: "This field has to be filled." }),
	content: z
		.string({
			invalid_type_error: "Invalid content"
		})
		.min(1, { message: "This field has to be filled." }),
	type: z
		.string({
			invalid_type_error: "Invalid type"
		})
		.min(1, { message: "This field has to be filled." })
});

export async function saveAnnouncement(_state: {}, formData: FormData) {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
	const validatedFields = saveAnnouncementSchema.safeParse({
		id: formData.get("id"),
		title: formData.get("title"),
		content: formData.get("content"),
		type: formData.get("type")
	});

	if (!validatedFields.success) {
		return validatedFields.error.flatten().fieldErrors;
	}

	const body = JSON.stringify(validatedFields.data);

	const res = await fetch(`${base}/api/manage/announcements/${formData.get("id") as string}`, {
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

/*

const onSubmit = async (announcement: IManageAnnouncement): Promise<void> => {
		const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
		const res = await fetch(`${base}/api/manage/announcements/${params.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(announcement)
		});

		if (res.status === 202) {
			redirect("/manage/announcements");
		} else {
			console.error("An error occurred while updating the announcement");
		}
	};
*/
