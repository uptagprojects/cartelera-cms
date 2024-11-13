import { Alert, Card, CardHeader } from "octagon-ui";

import { IAnnouncement } from "./IAnnouncement";

export function NewsAnnouncementBox({ announcements }: { announcements: IAnnouncement[] }) {
	return (
		<Card hover={false}>
			<CardHeader title="Anuncios" />
			{announcements.map(announcement => (
				<Alert
					key={announcement.id}
					title={announcement.title}
					message={announcement.message}
					type={announcement.type as "info" | "warning" | "error" | "success"}
				/>
			))}
		</Card>
	);
}
