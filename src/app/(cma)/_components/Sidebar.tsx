import {
	LucideAward,
	LucideBook,
	LucideCalendar,
	LucideClapperboard,
	LucideNewspaper,
	LucideSettings,
	LucideSignal,
	LucideUserPlus
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import styles from "./Sidebar.module.css";

const menu = [
	{ title: "Dashboard", href: "/manage", Icon: LucideNewspaper },
	{ title: "Guias", href: "/manage/guides", Icon: LucideBook },
	{ title: "Anuncios", href: "/manage/announcements", Icon: LucideSignal },
	{ title: "Cursos", href: "/manage/courses", Icon: LucideAward },
	{ title: "Eventos", href: "/manage/events", Icon: LucideClapperboard },
	{ title: "Horarios", href: "/manage/schedules", Icon: LucideCalendar },
	{ title: "Usuarios", href: "/manage/users", Icon: LucideUserPlus },
	{ title: "Perfil", href: "/manage/profile", Icon: LucideSettings }
];

export const Sidebar: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<nav>
				<ul className={styles.menu}>
					{menu.map(({ title, href, Icon }) => (
						<li key={title} className={styles.menuItem}>
							<Link href={href} className={styles.menuItemLink}>
								<Icon />
								<span>{title}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};
