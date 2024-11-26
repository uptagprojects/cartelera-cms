import { ManageReturnHeader } from "../../../_components/ManageReturnReader";
import { useGetUserDetails } from "./actions";
import { UserForm } from "./components";

export default async function UserEditorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const data = await useGetUserDetails(id);

	return (
		<section>
			<ManageReturnHeader title="registrar usuario" />
			<UserForm id={id} initUser={data} />
		</section>
	);
}
