import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import { customFetch } from "../../../../lib/fetch";
import { IManageUser } from "../users/types";

export function useGetProfile(): IManageUser {
	const [user, setUser] = useState<IManageUser>({
		id: "",
		name: "",
		email: "",
		emailVerified: null,
		avatar: "",
		status: "active"
	});

	useEffect(() => {
		const fetchData = async () => {
			const req = await customFetch("/api/manage/users/me");

			if (req.status >= 400) {
				redirect("/news");
			}
			const user: IManageUser = await req.json();

			setUser(user);
		};
		fetchData().catch(() => {});
	}, []);

	return user;
}
