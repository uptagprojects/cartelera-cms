"use client";
import Link from "next/link";
import { Footer } from "octagon-ui";

import styles from "./PageFooter.module.css";

export function PageFooter() {
	return (
		<Footer>
			<div className={styles.wrapper}>
				<Link href="/">Inicio</Link>
				<Link href="/news">Cartelera</Link>
				<Link href="/tv">Modo TV</Link>

				<Link href="https://github.com/uptagprojects/cartelera-cms" target="_blank">
					Contribuir
				</Link>
				<Link href="https://uptagprojects.github.io/octagon-design-system/" target="_blank">
					Design System
				</Link>
				<Link href="https://uptagprojects.github.io/octagon-ui/">UI Kit</Link>
				<Link href="https://github.com/uptagprojects" target="_blank">
					Github
				</Link>
				<Link href="https://github.io/uptagprojects/cartelera-cms" target="_blank">
					Issues
				</Link>

				<Link href="https://uptag.net/" target="_blank">
					UPTAG
				</Link>
				<Link href="/schedule">Horarios</Link>
				<Link href="/">Malla Curricular</Link>
				<Link href="https://siace.uptag.net/index.php" target="_blank">
					SIACE-UPTAG
				</Link>
			</div>
		</Footer>
	);
}
