import { redirect } from "next/navigation";
import { z } from "zod";

import { customFetch } from "../../../../../lib/fetch";

export const useGetAnnouncementDetails = async (id: string) => {
    let data = null;
    const res = await customFetch(`/api/manage/announcements/${id}`);
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
};

const saveAnnouncementSchema = z.object({
    id: z.string().uuid(),
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

    const res = await customFetch(`/api/manage/announcements/${formData.get("id") as string}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return redirect("/manage/announcements");
}
