"use client";
import { Avatar, Button, Card, CardFooter, CardHeader, Container, Spinner, Tag, TextInput } from "octagon-ui";
import { IRecentGuide } from "../news/components/IRecentGuide";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../lib/formatDate";
import { useGetGuides } from "./actions";
import styles from "./Guides.module.css";

export const GuideListItem = ({ id, title, area, contentWrapped, professor, publishDate }: IRecentGuide) => {
	const router = useRouter();
	return (
		<div onClick={() => router.push(`/guides/${id}`)}>
			<Card>
				<CardHeader title={title} />
				<Tag label={area} />
				<p>{contentWrapped}</p>
				<CardFooter>
					<div className={styles.recentGuidesFooter}>
						<Avatar src={professor.avatar} alt={professor.name} />
						<div>
							<p className={styles.recentGuidesAuthor}>
								{professor.name}
							</p>
							<time>Publicado {formatDate(publishDate)}</time>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};




export const GuideList = () => {
	const { guides, loading, noMoreAvailable, loadMore } = useGetGuides();

	if (!loading && guides.length === 0) {
		return <></>;
	}

	return (
		<>
			<Container align="center">
				<header>
					<h3>Guías Publicadas</h3>
				</header>
			</Container>
			<div>
				{guides.map(guide => (
					<GuideListItem
						key={guide.id}
						{...guide}
					/>
				))}
			</div>
			<Container align="center">
				{loading && <Spinner />}
				{!noMoreAvailable && (
					<Button
						size="small"
						variant="secondary"
						onClick={loadMore}
						label="Cargar más"
					/>
				)}
			</Container>
		</>
	);
};
