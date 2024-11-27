"use client";
import { useRouter } from "next/navigation";
import { Avatar, Card, CardFooter, CardHeader, Container, Tag } from "octagon-ui";
import React, { FC } from "react";

import { formatDate } from "../../../../lib/formatDate";
import { IRecentGuide } from "./IRecentGuide";
import styles from "./News.module.css";

type NewsRecentGuidesBoxProps = {
	guides: IRecentGuide[];
};
export const NewsRecentGuidesBox: FC<NewsRecentGuidesBoxProps> = ({ guides }) => {
	const router = useRouter();

	return (
		<Container className={styles.recentGuides}>
			<CardHeader title="Publicaciones recientes" />
			{guides.map(guide => (
				<div key={guide.id} onClick={() => router.push(`/guides/${guide.id}`)}>
					<Card key={guide.id}>
						<CardHeader title={guide.title} />
						<Tag label={guide.area} />
						<p>{guide.contentWrapped}</p>
						<CardFooter>
							<div className={styles.recentGuidesFooter}>
								<Avatar src={guide.professor.avatar} alt={guide.professor.name} />
								<div>
									<p className={styles.recentGuidesAuthor}>
										{guide.professor.name}
									</p>
									<time>Publicado {formatDate(guide.publishDate)}</time>
								</div>
							</div>
						</CardFooter>
					</Card>
				</div>
			))}
		</Container>
	);
};
