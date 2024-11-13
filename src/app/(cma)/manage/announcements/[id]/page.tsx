import { ManageReturnHeader } from "../../../_components/ManageReturnReader";
import { useGetAnnouncementDetails } from "./actions";
import { AnnouncementForm } from "./components";

export default async function AnnouncementEditorPage({
	params
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const data = await useGetAnnouncementDetails(id);

	return (
		<section>
			<ManageReturnHeader title="Editar anuncio" />
			<AnnouncementForm id={id} initAnnouncement={data} />
		</section>
	);
}
