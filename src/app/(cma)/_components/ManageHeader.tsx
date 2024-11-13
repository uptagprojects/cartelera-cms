"use client";
import { Button } from "octagon-ui";
import { MouseEventHandler } from "react";

import styles from "./ManageHeader.module.css";

export function ManageHeader({
	title,
	label,
	onClick
}: {
	title: string;
	label: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<header className={styles.header}>
			<h2>{title}</h2>
			<Button size="small" variant="primary" label={label} onClick={onClick} />
		</header>
	);
}
