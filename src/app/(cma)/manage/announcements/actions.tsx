import qs from "qs";
import { useEffect, useState } from "react";


import { z } from "zod";

export interface IManageAnnouncement {
	id: string;
	title: string;
	content: string;
	publishDate: string;
	type: string;
	status: string;
}


export function useGetAnnouncements(): {
	page: number;
	announcements: IManageAnnouncement[];
	loadMore: () => void;
	noMoreAvailable: boolean;
    remove: (id: string) => void;
} {
    const defaultSize = 10;
	const [announcements, setAnnouncements] = useState<IManageAnnouncement[]>([]);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
			const query = qs.stringify({
				pageSize: defaultSize,
				pageNumber: page
			});

			const data = await fetch(`${base}/api/manage/announcements?${query}`).then(res =>
				res.json()
			);

			setAnnouncements(state => [...state, ...data].filter(
                (announcement, index, all) => all.findIndex(a => a.id === announcement.id) === index
            ));
		};

		fetchData().catch(() => {});
	}, [page]);

    const removeAnnouncement = (id: string) => {
        setAnnouncements(state => state.filter(announcement => announcement.id !== id));
    }

	return {
		page,
		announcements,
		loadMore: () => {
			setPage(state => state + 1);
		},
		noMoreAvailable: announcements.length % defaultSize !== 0,
        remove: removeAnnouncement
	};
}


export async function saveAnnouncementContent(_state: { id: string }, formData: FormData) {

    const titleSchema = z.object({
        title: z.string().min(1, { message: "This field has to be filled." }),
        content: z.string().min(1, { message: "This field has to be filled." }),
    });

    const validated = titleSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if(!validated.success) {
        return validated.error.flatten().fieldErrors;
    }

    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
    const updateTitle = fetch(`${base}/api/manage/announcements/${_state.id}/edit/title`, {
        method: "PUT",
        headers: {
			"Content-Type": "application/json"
		},
        body: JSON.stringify({
            title: validated.data.title
        })
    });

    const updateContent = fetch(`${base}/api/manage/announcements/${_state.id}/edit/content`, {
        method: "PUT",
        headers: {
			"Content-Type": "application/json"
		},
        body: JSON.stringify({
            content: validated.data.content
        })
    });

    const [res1, res2] = await Promise.all([updateTitle, updateContent]);

    if(res1.status >= 400) {
        return await res1.json();
    }

	if (res2.status >= 400) {
		return await res2.json();
	}

	return {};
}

export async function archiveAnnouncement(_state: { id: string }) {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

    const res = await fetch(`${base}/api/manage/announcements/${_state.id}/archive`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return {};
}

export async function publishAnnouncement(_state: { id: string }) {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

    const res = await fetch(`${base}/api/manage/announcements/${_state.id}/publish`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return {};
}

export async function restoreAnnouncement(_state: { id: string }) {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

    const res = await fetch(`${base}/api/manage/announcements/${_state.id}/restore`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status >= 400) {
        return await res.json();
    }

    return {};
}


export async function deleteAnnouncement(_state: { id: string }) {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

    const res = await fetch(`${base}/api/manage/announcements/${_state.id}/remove`, {
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