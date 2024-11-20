"use client";
import { useRouter } from "next/navigation";
import { Button } from "octagon-ui";

import styles from "./ManageReturnHeader.module.css";

export function ManageReturnHeader({ title }: { title: string }) {
	const router = useRouter();
	const returnPage = () => {
		router.back();
	};

	return (
		<header className={styles.header}>
			<Button
				icon="ArrowLeft"
				size="small"
				variant="tertiary"
				label="Volver"
				onClick={returnPage}
			/>
			<h4>{title}</h4>
		</header>
	);
}
