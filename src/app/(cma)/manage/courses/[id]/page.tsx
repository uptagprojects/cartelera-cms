import { ManageReturnHeader } from "../../../_components/ManageReturnReader";
import { useGetCourseDetails } from "./actions";
import { CourseForm } from "./components";

export default async function CourseEditorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const data = await useGetCourseDetails(id);

	return (
		<section>
			<ManageReturnHeader title="Editar curso" />
			<CourseForm id={id} initCourse={data} />
		</section>
	);
}
