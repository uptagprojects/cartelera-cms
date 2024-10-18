import { Button, Card, CardFooter, CardHeader } from "octagon-ui";
import React from "react";

const newsArticles = [
	{ id: 1, title: "News Article 1", content: "Content for news article 1." },
	{ id: 2, title: "News Article 2", content: "Content for news article 2." },
	{ id: 3, title: "News Article 3", content: "Content for news article 3." }
];

const events = [
	{
		id: 1,
		title: "News Article 1",
		date: "tomorrow, 12:30pm",
		content: "Content for news article 1."
	},
	{
		id: 2,
		title: "News Article 2",
		date: "tomorrow, 12:30pm",
		content: "Content for news article 2."
	},
	{
		id: 3,
		title: "News Article 3",
		date: "tomorrow, 12:50pm",
		content: "Content for news article 3."
	}
];

const NewsPage: React.FC = () => {
	return (
		<div>
			<aside>
				<section>
					<h4>Proximos Eventos</h4>
					{events.map(event => (
						<Card key={event.id}>
							<CardHeader title={event.date} subtitle={event.title} />
							<p>{event.content}</p>
							<CardFooter>
								<Button variant="tertiary" label="Ver mas" />
							</CardFooter>
						</Card>
					))}
				</section>
				<section>
					<h4>Nuevos Cursos</h4>
					<ul>
						<li>Curso 1</li>
						<li>Curso 2</li>
						<li>Curso 3</li>
					</ul>
				</section>
			</aside>
			<section>
				<h1>Ultimas guias</h1>
				<ul>
					{newsArticles.map(article => (
						<li key={article.id}>
							<h2>{article.title}</h2>
							<p>{article.content}</p>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default NewsPage;
