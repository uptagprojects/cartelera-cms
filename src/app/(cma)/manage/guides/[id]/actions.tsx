import { redirect } from "next/navigation";
import { z } from "zod";

import { customFetch } from "../../../../../lib/fetch";
import { IManageGuide } from "../types";

export const useGetGuideDetails = async (id: string) => {
    const res = await customFetch(`/api/manage/guides/${id}`);
    if (res.ok) {
        const data = await res.json();

        return data;
    }

    return null;
};

const saveGuideSchema = z.object({
    id: z.string().uuid(),
    title: z
        .string({
            invalid_type_error: "Invalid title"
        })
        .min(1, { message: "This field has to be filled." }),
    content: z
        .string({
            invalid_type_error: "guide_title_not_valid",
            required_error: "guide_title_required"
        })
        .min(1, { message: "This field has to be filled." }),
    ucId: z.string().uuid()
});

export async function saveGuide(_state: { initGuide: IManageGuide | null }, formData: FormData) {
    const validatedFields = saveGuideSchema.safeParse({
        id: formData.get("id"),
        title: formData.get("title"),
        content: formData.get("content"),
        ucId: formData.get("ucId")
    });

    if (!validatedFields.success) {
        return validatedFields.error.flatten().fieldErrors;
    }

    const body = JSON.stringify(validatedFields.data);

    const res = await customFetch(`/api/manage/guides/${formData.get("id") as string}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return redirect("/manage/guides");
}
