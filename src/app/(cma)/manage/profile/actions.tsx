import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export async function handleSignOut() {
	await signOut();

	redirect("/");
}
