import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

import { auth } from "../../../../lib/auth";
import { customFetch } from "../../../../lib/fetch";
import { IManageUser } from "../users/types";

export async function handleSignOut() {
	await signOut();

	redirect("/");
}

export async function useGetProfile(): Promise<IManageUser> {
	const session = await auth();
	if (!session?.user?.id) {
		redirect("/");
	}
	const req = await customFetch(session.user.id);
	const user: IManageUser = await req.json();

	return user;
}
