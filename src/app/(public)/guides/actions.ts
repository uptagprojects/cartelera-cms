import { useEffect, useReducer } from "react";
import { IRecentGuide } from "../news/components/IRecentGuide";
import { GuideAction, GuideActionTypes, GuideState } from "./types";
import qs from "qs";
import { customFetch } from "../../../lib/fetch";
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
			const payload = action.payload as IRecentGuide[];
			const indexes = new Set(state.indexes);
			const newGuidesMap = {
				...state.guides
			};
			payload.forEach((g: IRecentGuide) => {
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
		default:
			return state;
	}
}

export function useGetGuides(): {
	loading: boolean;
	guides: IRecentGuide[];
	noMoreAvailable: boolean;
	loadMore: () => void;
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
				const data = await customFetch(`/api/guides?${query}`).then(res =>
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
		}
	};
}