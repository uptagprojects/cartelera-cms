import { ReactNode } from "react";

import styles from "./ManageListContainer.module.css";

export const ManageListContainer = ({ children }: { children: ReactNode }) => (
	<section className={styles.list}>{children}</section>
);
