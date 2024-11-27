import { Metadata } from "next";

import { Profile } from "./components";

export const metadata: Metadata = {
	title: "PNFi | Perfil",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function ProfilePage() {
	return (
		<div>
			<Profile />
		</div>
	);
}
