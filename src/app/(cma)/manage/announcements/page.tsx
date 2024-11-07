import { Metadata } from "next";
import { redirect } from "next/navigation";

import { ManageHeader } from "../../_components/ManageHeader";
import { AnnouncementList } from "./components/AnnouncementList";

export const metadata: Metadata = {
	title: "PNFi | Anuncios",
	description: "Programa Nacional de Formacion en Informatica"
};

export default function AnnouncementsPage() {
	const handleCreateAnnouncement = async () => {
		"use server";
		const id = globalThis.crypto.randomUUID();
		redirect(`/manage/announcements/${id}`);
	};

	return (
		<article>
			<ManageHeader
				title="Anuncios"
				label="crear anuncio"
				action={handleCreateAnnouncement}
			/>
			<section>
				<p>
					Los anuncios son alertas que seran mostrados al resto de la pagina y en la TV.
				</p>
			</section>
			<section>
				<AnnouncementList />
			</section>
		</article>
	);
}
