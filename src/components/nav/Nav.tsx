"use client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Avatar, Navbar, NavItem, Switch } from "octagon-ui";

import { useTheme } from "../../app/services/useTheme";
import { Brand } from "../brand/Brand";
import { LoginButton } from "./LoginButton";

export const Nav = ({ user }: { user: User | null }) => {
	const { theme, toggleTheme } = useTheme();

	const avatarUrl = user?.user_metadata.avatar_url;
	const userName = user?.user_metadata.full_name || user?.email;

	return (
		<Navbar brand={<Brand />}>
			<NavItem>
				<Link href="/news">Noticias</Link>
			</NavItem>
			<NavItem>
				<Link href="/guides">Guías</Link>
			</NavItem>

			{user ? (
				<>
					<NavItem>
						<Link href="/manage/onboarding">CMS</Link>
					</NavItem>
					<NavItem>
						<Link
							href="/manage/profile"
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<Avatar alt={userName} size={32} src={avatarUrl} />
							{userName}
						</Link>
					</NavItem>
				</>
			) : (
				<>
					<LoginButton />
				</>
			)}

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
