"use client";
import Link from "next/link";
import { Navbar, NavItem } from "octagon-ui";

import { Brand } from "../brand/Brand";

export const Nav = () => (
	<Navbar brand={<Brand />}>
		<NavItem>
			<Link href="/schedules">horarios</Link>
		</NavItem>
		<NavItem>
			<Link href="/news">Noticias</Link>
		</NavItem>
		<NavItem>
			<Link href="/guides">Guias</Link>
		</NavItem>
	</Navbar>
);
