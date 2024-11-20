import { ManageReturnHeader } from "../../../_components/ManageReturnReader";
import { useGetUCDetails } from "./actions";
import { UCForm } from "./components";

export default async function UCEditorPage({
	params
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const data = await useGetUCDetails(id);

	return (
		<section>
			<ManageReturnHeader title="Crear unidad curricular" />
			<UCForm id={id} initUC={data} />
		</section>
	);
}
