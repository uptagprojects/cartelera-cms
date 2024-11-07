"use client";
import Link from "next/link";
import { Navbar, NavItem, Switch } from "octagon-ui";

import { useTheme } from "../../app/services/useTheme";
import { Brand } from "../brand/Brand";

export const Nav = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Navbar brand={<Brand />}>
			<NavItem>
				<Link href="/news">Noticias</Link>
			</NavItem>
			<NavItem>
				<Link href="/guides">Guias</Link>
			</NavItem>
			<NavItem>
				<Link href="/login">Login</Link>
			</NavItem>
			<Switch
				label=""
				hideLabel={true}
				size="small"
				style={
					{
						"--oct-switch-unchecked-color": "var(--cyan-200)",
						"--oct-switch-toggled-color": "var(--gray-200)"
					} as React.CSSProperties
				}
				active={theme === "dark"}
				onChange={toggleTheme}
			/>
		</Navbar>
	);
};
