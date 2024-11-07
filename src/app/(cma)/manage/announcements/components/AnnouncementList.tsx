"use client";
import { Button, Container, Spinner } from "octagon-ui";
import { Suspense } from "react";

import { useGetAnnouncements } from "./useGetAnnouncements";

export const AnnouncementList = () => {
	const { announcements, loadMore } = useGetAnnouncements();

	return (
		<Suspense fallback={<AnnouncementLoader />}>
			{announcements.map(announcement => (
				<div key={announcement.id}>
					<h3>{announcement.title}</h3>
					<p>{announcement.content}</p>
				</div>
			))}
			<Button size="small" variant="tertiary" onClick={loadMore} label="Cargar más" />
		</Suspense>
	);
};

const AnnouncementLoader = () => (
	<Container display align="center">
		<Spinner />
	</Container>
);
