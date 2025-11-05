import { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "../../../../lib/supabase/server";
import { Profile } from "./components";

export const metadata: Metadata = {
	title: "PNFi | Perfil",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function ProfilePage() {
	//Fetch the user on the server
	const supabase = createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	// if no user, redirect away
	if (!user) {
		redirect("/");
	}

	return (
		<div>
			<Profile user={user} />
		</div>
	);
}
