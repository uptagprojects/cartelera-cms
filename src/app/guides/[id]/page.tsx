import React from "react";
import ReactMarkdown from "react-markdown";

const guide = {
	title: "Guia 1",
	content:
		"## markdown content\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc",
	date: "2021-08-01",
	uc: "ingles"
};

const GuidePage: React.FC = () => {
	return (
		<article>
			<header>
				<h1>{guide.title}</h1>
			</header>
			<ReactMarkdown>{guide.content}</ReactMarkdown>
			<footer>
				<time dateTime={guide.date}>{guide.date}</time>
			</footer>
		</article>
	);
};

export default GuidePage;
