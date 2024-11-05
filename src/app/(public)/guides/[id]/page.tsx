import { Metadata } from "next";

import { GuideReader } from "./GuideReader";
import { useGetGuide } from "./services/useGetGuide";

interface GuidePageProps {
	params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
	title: "PNFi | Leer Guia",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function GuidePage({ params }: GuidePageProps) {
	const { id } = await params;
	const guide = await useGetGuide(id);

	return <GuideReader {...guide} />;
}
