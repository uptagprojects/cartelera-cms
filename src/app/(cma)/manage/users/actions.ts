import qs from "qs";
import { useEffect, useReducer } from "react";
import { z } from "zod";

import { customFetch } from "../../../../lib/fetch";
import { IManageUser, UserAction, UserActionTypes, UserState } from "./types";

const PAGE_SIZE = 10;

const initialList: UserState = {
	users: {},
	indexes: new Set(),
	page: 1,
	fetchPending: false,
	noMoreAvailable: false
};

function userReducer(state: UserState, action: UserAction) {
	switch (action.type) {
		case UserActionTypes.LOAD_MORE:
			return {
				...state,
				fetchPending: true,
				page: state.page + 1
			};
		case UserActionTypes.LOAD_MORE_SUCCESS: {
			const payload = action.payload as IManageUser[];
			const indexes = new Set(state.indexes);
			const newUsersMap = {
				...state.users
			};
			payload.forEach((a: IManageUser) => {
				newUsersMap[a.id] = a;
				indexes.add(a.id);
			});

			return {
				...state,
				fetchPending: false,
				noMoreAvailable: payload.length < PAGE_SIZE,
				users: {
					...state.users,
					...newUsersMap
				},
				indexes
			};
		}
		case UserActionTypes.LOAD_MORE_ERROR:
			return {
				...state,
				fetchPending: false,
				page: state.page > 0 ? state.page - 1 : state.page
			};
		default:
			return state;
	}
}

export function useGetUsers(): {
	loading: boolean;
	users: IManageUser[];
	noMoreAvailable: boolean;
	loadMore: () => void;
} {
	const [state, dispatch] = useReducer(userReducer, initialList);

	useEffect(() => {
		const fetchData = async () => {
			const query = qs.stringify({
				pageSize: PAGE_SIZE,
				pageNumber: state.page,
				orderBy: "update_timestamp",
				orderType: "DESC"
			});

			try {
				const data = await customFetch(`/api/manage/users?${query}`).then(res =>
					res.json()
				);

				dispatch({
					type: UserActionTypes.LOAD_MORE_SUCCESS,
					payload: data
				});
			} catch {
				dispatch({
					type: UserActionTypes.LOAD_MORE_ERROR,
					payload: null
				});
			}
		};

		fetchData().catch(() => {});
	}, [state.page]);

	return {
		loading: state.fetchPending,
		users: Array.from(state.indexes).map(id => state.users[id]),
		noMoreAvailable: state.noMoreAvailable,
		loadMore: () => {
			dispatch({
				type: UserActionTypes.LOAD_MORE,
				payload: null
			});
		}
	};
}

export async function renameUser(_state: { id: string; name: string }): Promise<unknown> {
	const nameSchema = z
		.string()
		.min(1, "This field has to be filled.")
		.max(120, "This field is too long.");

	const validated = nameSchema.safeParse(_state.name);

	if (!validated.success) {
		return validated.error.message;
	}

	const res = await customFetch(`/api/manage/users/${_state.id}/rename`, {
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

export async function updateUserEmail(_state: { id: string; email: string }): Promise<unknown> {
	const emailSchema = z.string().email("Invalid email address.");

	const validated = emailSchema.safeParse(_state.email);

	if (!validated.success) {
		return validated.error.message;
	}

	const res = await customFetch(`/api/manage/users/${_state.id}/email`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: validated.data
		})
	});

	if (res.status >= 400) {
		return await res.json();
	}

	return {};
}

export async function archiveUser(_state: { id: string }): Promise<unknown> {
	const res = await customFetch(`/api/manage/users/${_state.id}/archive`, {
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

export async function restoreUser(_state: { id: string }): Promise<unknown> {
	const res = await customFetch(`/api/manage/users/${_state.id}/restore`, {
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

export async function blockUser(_state: { id: string }): Promise<unknown> {
	const res = await customFetch(`/api/manage/users/${_state.id}/block`, {
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
