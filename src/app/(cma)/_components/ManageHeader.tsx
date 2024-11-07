"use client";
import { Button } from "octagon-ui";

export function ManageHeader({
	title,
	label,
	action
}: {
	title: string;
	label: string;
	action: () => void;
}) {
	return (
		<header>
			<h2>{title}</h2>
			<Button size="small" variant="primary" label={label} onClick={action} />
		</header>
	);
}
