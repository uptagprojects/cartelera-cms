import qs from "qs";
import { useEffect, useReducer } from "react";
import { z } from "zod";

import {
	AnnouncementAction,
	AnnouncementActionTypes,
	AnnouncementState,
	IManageAnnouncement
} from "./types";

const PAGE_SIZE = 10;

const initialList: AnnouncementState = {
	announcements: {},
	indexes: new Set(),
	page: 1,
	fetchPending: false,
	noMoreAvailable: false
};

function announcementReducer(state: AnnouncementState, action: AnnouncementAction) {
	switch (action.type) {
		case AnnouncementActionTypes.LOAD_MORE:
			return {
				...state,
				fetchPending: true,
				page: state.page + 1
			};
		case AnnouncementActionTypes.LOAD_MORE_SUCCESS: {
			const payload = action.payload as IManageAnnouncement[];
			const indexes = new Set(state.indexes);
			const newAnnouncementsMap = {
				...state.announcements
			};
			payload.forEach((a: IManageAnnouncement) => {
				newAnnouncementsMap[a.id] = a;
				indexes.add(a.id);
			});

			return {
				...state,
				fetchPending: false,
				noMoreAvailable: payload.length < PAGE_SIZE,
				announcements: {
					...state.announcements,
					...newAnnouncementsMap
				},
				indexes
			};
		}
		case AnnouncementActionTypes.LOAD_MORE_ERROR:
			return {
				...state,
				fetchPending: false,
				page: state.page > 0 ? state.page - 1 : state.page
			};
		case AnnouncementActionTypes.REMOVE: {
			const payload = action.payload as string;
			const newAnnouncementsMap = {
				...state.announcements
			};
			delete newAnnouncementsMap[payload];
			const indexes = new Set(state.indexes);
			indexes.delete(payload);

			return {
				...state,
				announcements: newAnnouncementsMap,
				indexes
			};
		}
		default:
			return state;
	}
}

export function useGetAnnouncements(): {
	loading: boolean;
	announcements: IManageAnnouncement[];
	noMoreAvailable: boolean;
	loadMore: () => void;
	remove: (id: string) => void;
} {
	const [state, dispatch] = useReducer(announcementReducer, initialList);

	useEffect(() => {
		const fetchData = async () => {
			const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
			const query = qs.stringify({
				pageSize: PAGE_SIZE,
				pageNumber: state.page,
				orderBy: "update_timestamp",
				orderType: "DESC"
			});

			try {
				const data = await fetch(`${base}/api/manage/announcements?${query}`).then(res =>
					res.json()
				);

				dispatch({
					type: AnnouncementActionTypes.LOAD_MORE_SUCCESS,
					payload: data
				});
			} catch {
				dispatch({
					type: AnnouncementActionTypes.LOAD_MORE_ERROR,
					payload: null
				});
			}
		};

		fetchData().catch(() => {});
	}, [state.page]);

	return {
		loading: state.fetchPending,
		announcements: Array.from(state.indexes).map(id => state.announcements[id]),
		noMoreAvailable: state.noMoreAvailable,
		loadMore: () => {
			dispatch({
				type: AnnouncementActionTypes.LOAD_MORE,
				payload: null
			});
		},
		remove: (id: string) => {
			dispatch({
				type: AnnouncementActionTypes.REMOVE,
				payload: id
			});
		}
	};
}

export async function updateAnnouncementTitle(_state: { id: string; title: string }) {
	const titleSchema = z
		.string()
		.min(1, "This field has to be filled.")
		.max(120, "This field is too long.");

	const validated = titleSchema.safeParse(_state.title);

	if (!validated.success) {
		return validated.error.message;
	}

	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

	const res = await fetch(`${base}/api/manage/announcements/${_state.id}/title`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			title: validated.data
		})
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return {};
}

export async function updateAnnouncementContent(_state: { id: string; content: string }) {
	const contentSchema = z
		.string()
		.min(1, "This field has to be filled.")
		.max(320, "This field is too long.");

	const validated = contentSchema.safeParse(_state.content);

	if (!validated.success) {
		return validated.error.message;
	}

	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

	const res = await fetch(`${base}/api/manage/announcements/${_state.id}/content`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			content: validated.data
		})
	});

	if (res.status >= 400) {
		return await res.json();
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
