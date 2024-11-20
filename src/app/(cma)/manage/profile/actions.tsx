import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export async function handleSignOut() {
    await signOut();

    redirect("/")
}