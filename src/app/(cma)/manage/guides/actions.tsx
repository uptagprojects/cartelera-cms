import qs from "qs";
import { useEffect, useReducer } from "react";

import { customFetch } from "../../../../lib/fetch";
import { GuideAction, GuideActionTypes, GuideState, IManageGuide } from "./types";

const PAGE_SIZE = 10;

const initialList: GuideState = {
	guides: {},
	indexes: new Set(),
	page: 1,
	fetchPending: false,
	noMoreAvailable: false
};

function guideReducer(state: GuideState, action: GuideAction) {
	switch (action.type) {
		case GuideActionTypes.LOAD_MORE:
			return {
				...state,
				fetchPending: true,
				page: state.page + 1
			};
		case GuideActionTypes.LOAD_MORE_SUCCESS: {
			const payload = action.payload as IManageGuide[];
			const indexes = new Set(state.indexes);
			const newGuidesMap = {
				...state.guides
			};
			payload.forEach((g: IManageGuide) => {
				newGuidesMap[g.id] = g;
				indexes.add(g.id);
			});

			return {
				...state,
				fetchPending: false,
				noMoreAvailable: payload.length < PAGE_SIZE,
				guides: {
					...state.guides,
					...newGuidesMap
				},
				indexes
			};
		}
		case GuideActionTypes.LOAD_MORE_ERROR:
			return {
				...state,
				fetchPending: false,
				page: state.page > 0 ? state.page - 1 : state.page
			};
		case GuideActionTypes.REMOVE: {
			const payload = action.payload as string;
			const newGuidesMap = {
				...state.guides
			};
			delete newGuidesMap[payload];
			const indexes = new Set(state.indexes);
			indexes.delete(payload);

			return {
				...state,
				guides: newGuidesMap,
				indexes
			};
		}
		default:
			return state;
	}
}

export function useGetGuides(): {
	loading: boolean;
	guides: IManageGuide[];
	noMoreAvailable: boolean;
	loadMore: () => void;
	remove: (id: string) => void;
} {
	const [state, dispatch] = useReducer(guideReducer, initialList);

	useEffect(() => {
		const fetchData = async () => {
			const query = qs.stringify({
				pageSize: PAGE_SIZE,
				pageNumber: state.page,
				orderBy: "update_timestamp",
				orderType: "DESC"
			});

			try {
				const data = await customFetch(`/api/manage/guides?${query}`).then(res =>
					res.json()
				);

				dispatch({
					type: GuideActionTypes.LOAD_MORE_SUCCESS,
					payload: data
				});
			} catch {
				dispatch({
					type: GuideActionTypes.LOAD_MORE_ERROR,
					payload: null
				});
			}
		};

		fetchData().catch(() => {});
	}, [state.page]);

	return {
		loading: state.fetchPending,
		guides: Array.from(state.indexes).map(id => state.guides[id]),
		noMoreAvailable: state.noMoreAvailable,
		loadMore: () => {
			dispatch({
				type: GuideActionTypes.LOAD_MORE,
				payload: null
			});
		},
		remove: (id: string) => {
			dispatch({
				type: GuideActionTypes.REMOVE,
				payload: id
			});
		}
	};
}

export async function archiveGuide(_state: { id: string }) {
	const res = await customFetch(`/api/manage/guides/${_state.id}/archive`, {
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

export async function publishGuide(_state: { id: string }) {
	const res = await customFetch(`/api/manage/guides/${_state.id}/publish`, {
		method: "PUT"
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return {};
}

export async function restoreGuide(_state: { id: string }) {
	const res = await customFetch(`/api/manage/guides/${_state.id}/restore`, {
		method: "PUT"
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return {};
}

export async function deleteGuide(_state: { id: string }) {
	const res = await customFetch(`/api/manage/guides/${_state.id}/remove`, {
		method: "DELETE"
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return {};
}
