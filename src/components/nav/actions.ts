"use server";

import { signIn } from "../../app/auth";

export async function signInAction(): Promise<void> {
	"use server";
	await signIn();
}
