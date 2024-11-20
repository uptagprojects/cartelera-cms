"use client";

import { Alert } from "octagon-ui";
import styles from "./News.module.css";

import { IAnnouncement } from "./IAnnouncement";
import { useState } from "react";

export function NewsAnnouncementBox({ announcements }: { announcements: IAnnouncement[] }) {
	const [announcementList, setAnnouncementList] = useState<IAnnouncement[]>(announcements);

	return (
		<div className={styles.recentAnnouncements}>
			{announcementList.map(announcement => (
				<Alert
					key={announcement.id}
					title={announcement.title}
					message={announcement.content}
					type={announcement.type as "info" | "warning" | "error" | "success"}
					onClose={() => {
						setAnnouncementList(announcementList.filter(a => a.id !== announcement.id));
					}}
				/>
			))}
		</div>
	);
}
