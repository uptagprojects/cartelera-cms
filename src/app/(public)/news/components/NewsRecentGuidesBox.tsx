import { Avatar, Card, CardFooter, CardHeader, Tag } from "octagon-ui";
import React, { FC } from "react";

import { IRecentGuide } from "./IRecentGuide";
import styles from "./News.module.css";

type NewsRecentGuidesBoxProps = {
	guides: IRecentGuide[];
};
export const NewsRecentGuidesBox: FC<NewsRecentGuidesBoxProps> = ({ guides }) => {
	return (
		<Card hover={false} className={styles.recentGuides}>
			<CardHeader title="Publicaciones recientes" />
			{guides.map(guide => (
				<Card key={guide.id} image={guide.image} aspectRatio="portrait">
					<CardHeader title={guide.title} />
					<Tag label={guide.area} />
					<p>{guide.contentWrapped}</p>
					<CardFooter>
						<Avatar src={guide.professor.avatar} alt={guide.professor.name} />
						<p>{guide.professor.name}</p>
					</CardFooter>
				</Card>
			))}
		</Card>
	);
};
