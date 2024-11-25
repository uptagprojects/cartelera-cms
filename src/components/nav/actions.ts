"use server";

import { signIn } from "../../lib/auth";

export async function signInAction(): Promise<void> {
	"use server";
	await signIn();
}
