import { Metadata } from "next";

import { useGetProfile } from "./actions";
import { Profile } from "./components";

export const metadata: Metadata = {
	title: "PNFi | Perfil",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function ProfilePage() {
	const user = await useGetProfile();

	return (
		<div>
			<Profile {...user} />
		</div>
	);
}
