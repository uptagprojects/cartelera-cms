import { ManageReturnHeader } from "../../../_components/ManageReturnReader";
import { useServerGetManageUCs } from "../../uc/serverActions";
import { useGetGuideDetails } from "./actions";
import { GuideForm } from "./components";

export default async function GuideEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await useGetGuideDetails(id);
    const ucs = await useServerGetManageUCs();

    return (
        <section>
            <ManageReturnHeader title="Editar guia" />
            <GuideForm id={id} ucs={ucs} initGuide={data} />
        </section>
    );
}
