"use client";
import Link from "next/link";
import { Button, Navbar, NavItem, Switch } from "octagon-ui";
import { signIn } from "next-auth/react";

import { useTheme } from "../../app/services/useTheme";
import { Brand } from "../brand/Brand";

export const Nav = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Navbar brand={<Brand />}>
			<NavItem>
				<Link href="/schedules">horarios</Link>
			</NavItem>
			<NavItem>
				<Link href="/announcements">Noticias</Link>
			</NavItem>
			<NavItem>
				<Link href="/guides">Guias</Link>
			</NavItem>
				<Button variant="tertiary" onClick={() => signIn()} label="Login" />
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
