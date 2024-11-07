import qs from "qs";
import { useEffect, useState } from "react";

import { IManageAnnouncement } from "./IManageAnnouncement";

const defaultSize = 10;

export function useGetAnnouncements(): {
	page: number;
	announcements: IManageAnnouncement[];
	loadMore: () => void;
} {
	const [announcements, setAnnouncements] = useState<IManageAnnouncement[]>([]);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
			const query = qs.stringify({
				orderBy: "publish_date",
				orderType: "DESC",
				pageSize: defaultSize,
				pageNumber: page
			});

			const data = await fetch(`${base}/api/manage/announcements?${query}`).then(res =>
				res.json()
			);

			setAnnouncements(state => [...state, ...data]);
		};

		fetchData();
	}, [page]);

	return {
		page,
		announcements,
		loadMore: async () => {
			setPage(state => state + 1);
		}
	};
}
