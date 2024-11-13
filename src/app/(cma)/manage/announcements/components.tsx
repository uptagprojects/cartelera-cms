"use client";

import { useRouter } from "next/navigation";

import { ManageHeader } from "../../_components/ManageHeader";

export const AnnouncementHeader = () => {
	const router = useRouter();

	return (
		<ManageHeader
			title="Anuncios"
			label="crear anuncio"
			onClick={() => {
				const id = globalThis.crypto.randomUUID();
				router.push(`/manage/announcements/${id}`);
			}}
		/>
	);
};
