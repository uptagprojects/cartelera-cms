import { Tag } from "octagon-ui";
import styles from "./TV.module.css";

export const TVContent = ({
	title,
	subtitle,
	content,
	type
}: {
	title: string;
	subtitle: string;
	content: string;
	type: string;
}) => {
	return (
		<section className={styles.tvContent}>
			<h2>{subtitle} <Tag label={type} color="orange" variant="light" /></h2>
			<h1>{title}</h1>
			<h6>{content}</h6>
		</section>
	);
};
