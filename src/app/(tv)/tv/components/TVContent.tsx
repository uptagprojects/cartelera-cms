import styles from "./TV.module.css";

export const TVContent = ({
	title,
	subtitle,
	content
}: {
	title: string;
	subtitle: string;
	content: string;
}) => {
	return (
		<section className={styles.tvContent}>
			<h2>{subtitle}</h2>
			<h1>{title}</h1>
			<p>{content}</p>
		</section>
	);
};
