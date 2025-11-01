"use client";
import { useEffect, useState } from "react";
import { z } from "zod";

import { customFetch } from "../../../../lib/fetch";

export interface IManageUC {
    id: string;
    name: string;
}

export function useGetUCs(): {
    ucs: IManageUC[];
    remove: (id: string) => void;
} {
    const [ucs, setUcs] = useState<IManageUC[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await customFetch(`/api/manage/uc`).then(res => res.json());

            setUcs(data);
        };

        fetchData().catch(() => {});
    }, []);

    const removeUC = (id: string) => {
        setUcs(state => state.filter(uc => uc.id !== id));
    };

    return {
        ucs,
        remove: removeUC
    };
}

export async function saveUCContent(_state: { id: string }, formData: FormData) {
    const nameSchema = z.object({
        name: z.string().min(1, { message: "This field has to be filled." })
    });

    const validated = nameSchema.safeParse({
        name: formData.get("name")
    });

    if (!validated.success) {
        return validated.error.flatten().fieldErrors;
    }

    const res = await customFetch(`/api/manage/uc/${_state.id}/rename`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: validated.data.name
        })
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return {};
}

export async function updateUCName(_state: { id: string; name: string }) {
    const nameSchema = z.string().min(1, "This field has to be filled.").max(120, "This field is too long.");

    const validated = nameSchema.safeParse(_state.name);

    if (!validated.success) {
        return validated.error.message;
    }

    const res = await customFetch(`/api/manage/uc/${_state.id}/rename`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: validated.data
        })
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return {};
}

export async function deleteUC(_state: { id: string }) {
    const res = await customFetch(`/api/manage/uc/${_state.id}/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return {};
}
