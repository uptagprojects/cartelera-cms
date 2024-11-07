import { redirect } from "next/navigation";

import { IManageAnnouncement } from "../components/IManageAnnouncement";
import { AnnouncementForm, Header } from "./components";

const useGetAnnouncementDetails = async (id: string) => {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
	let data = null;
	try {
		const res = await fetch(`${base}/api/manage/announcements/${id}`);
		if (res.status === 404) {
			data = {
				id: "",
				title: "",
				content: "",
				publishDate: "",
				type: "info",
				status: "draft"
			};

			return data;
		}
		if (res.status === 200) {
			data = await res.json();

			return data;
		}

		throw new Error("An error occurred while fetching the announcement");
	} catch (error) {
		console.error(error);
	}
};

export default async function AnnouncementEditor({ params }: { params: { id: string } }) {
	const data = await useGetAnnouncementDetails(params.id);

	const onSubmit = async (announcement: IManageAnnouncement): Promise<void> => {
		const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
		const res = await fetch(`${base}/api/manage/announcements/${params.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(announcement)
		});

		if (res.status === 202) {
			redirect("/manage/announcements");
		} else {
			console.error("An error occurred while updating the announcement");
		}
	};

	return (
		<section>
			<Header />
			<AnnouncementForm
				id={data.id}
				initAnnouncement={data}
				action={announcement => {
					onSubmit(announcement).catch(console.error);
				}}
			/>
		</section>
	);
}
