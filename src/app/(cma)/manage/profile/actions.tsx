"use server";

import { auth } from "../../../../lib/auth";
import { customFetch } from "../../../../lib/fetch";
import { IManageUser } from "../users/types";

export async function useGetProfile(): Promise<IManageUser> {
	const session = await auth();

	if (!session?.user?.id) {
		return {
			id: "",
			name: "",
			email: "",
			emailVerified: null,
			avatar: "",
			status: "active"
		};
	}
	const req = await customFetch(session.user.id);
	const user: IManageUser = await req.json();

	return user;
}
