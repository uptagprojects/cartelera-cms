import { Metadata } from "next";

import { AnnouncementBento } from "./components/AnnouncementBento";

export const metadata: Metadata = {
	title: "PNFi | Noticias",
	description: "Programa Nacional de Formacion en Informatica"
};

export default function AnnouncementsPage() {
	return <AnnouncementBento />;
}
