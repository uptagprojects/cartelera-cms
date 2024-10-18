"use client";
import Link from "next/link";
import { Navbar, NavItem } from "octagon-ui";

import { Brand } from "../brand/Brand";

export const Nav = () => (
	<Navbar brand={<Brand />} hideSearch={false}>
		<NavItem>
			<Link href="/horario">horarios</Link>
		</NavItem>
		<NavItem>
			<Link href="/news">Noticias</Link>
		</NavItem>
	</Navbar>
);
