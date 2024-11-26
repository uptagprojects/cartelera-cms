import { redirect } from "next/navigation";
import { z } from "zod";

import { customFetch } from "../../../../../lib/fetch";

export const useGetUserDetails = async (id: string): Promise<unknown> => {
	let data = null;
	const res = await customFetch(`/api/manage/users/${id}`);
	if (res.status === 404) {
		data = {
			id,
			name: "",
			email: "",
			avatar: "https://avatar.iran.liara.run/public",
			status: "pending_confirmation"
		};

		return data;
	}
	if (res.status === 200) {
		data = await res.json();

		return data;
	}
};

const saveUserSchema = z.object({
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
	email: z
		.string({
			invalid_type_error: "Invalid email"
		})
		.email({ message: "This field has to be filled." }),
	avatar: z
		.string({
			invalid_type_error: "Invalid location"
		})
		.url({ message: "Instructor avatar is needed for aesthetic purposes." })
});

export async function saveUser(_state: {}, formData: FormData): Promise<unknown> {
	const validatedFields = saveUserSchema.safeParse({
		id: formData.get("id"),
		name: formData.get("name"),
		email: formData.get("email"),
		avatar: formData.get("avatar")
	});

	if (!validatedFields.success) {
		return validatedFields.error.flatten().fieldErrors;
	}

	const body = JSON.stringify({
		id: validatedFields.data.id,
		name: validatedFields.data.name,
		email: validatedFields.data.email,
		avatar: validatedFields.data.avatar
	});

	const res = await customFetch(`/api/manage/users/${formData.get("id") as string}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return redirect("/manage/users");
}
