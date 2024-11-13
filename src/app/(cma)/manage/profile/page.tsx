import { Metadata } from "next";

export const metadata: Metadata = {
	title: "PNFi | Perfil",
	description: "Programa Nacional de Formacion en Informatica"
};

export default function ProfilePage() {
	return (
		<div>
			<h1>Profile</h1>
			<p>This is the profile page</p>
		</div>
	);
}
