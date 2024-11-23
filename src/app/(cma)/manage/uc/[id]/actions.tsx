import { redirect } from "next/navigation";
import { z } from "zod";

export const useGetUCDetails = async (id: string) => {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
	let data = null;
	const res = await fetch(`${base}/api/manage/uc/${id}`);
	if (res.status === 404) {
		data = {
			id: "",
			name: ""
		};

		return data;
	}
	if (res.status === 200) {
		data = await res.json();

		return data;
	}
};

const saveUCSchema = z.object({
	id: z.string().uuid(),
	name: z
		.string({
			invalid_type_error: "Invalid name"
		})
		.min(1, { message: "This field has to be filled." })
});

export async function saveUC(_state: {}, formData: FormData) {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
	const validatedFields = saveUCSchema.safeParse({
		id: formData.get("id"),
		name: formData.get("name")
	});

	if (!validatedFields.success) {
		return validatedFields.error.flatten().fieldErrors;
	}

	const body = JSON.stringify(validatedFields.data);

	const res = await fetch(`${base}/api/manage/uc/${formData.get("id") as string}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return redirect("/manage/uc");
}
