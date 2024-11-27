import { redirect } from "next/navigation";
import { customFetch } from "../../../../lib/fetch";
import { IManageUser } from "../users/types";
import { useEffect, useState } from "react";

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
		(async () => {
			const req = await customFetch("/api/manage/users/me");

			if(req.status >= 400) {
				redirect("/news");
			}
			const user: IManageUser = await req.json();

			setUser(user);
		})();
	}, []);

	return user;
}
