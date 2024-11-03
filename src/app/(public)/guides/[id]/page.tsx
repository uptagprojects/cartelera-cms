import { Metadata } from "next";

import { GuideReader } from "./GuideReader";

interface GuidePageProps {
	params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
	title: "PNFi | Leer Guia",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function GuidePage({ params }: GuidePageProps) {
	const { id } = await params;
	const guide = await fetch(`http://127.0.0.1:3000/api/guides/${id}`).then(res => res.json());

	return <GuideReader {...guide} />;
}
