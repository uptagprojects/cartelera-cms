"use client";

import { NavItem } from "octagon-ui";

import { createClient } from "../../lib/supabase/client";

export function LoginButton() {
	const supabase = createClient();

	const handleLogin = async (): Promise<void> => {
		await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${location.origin}/api/auth/callback`
			}
		});
	};

	return (
		<NavItem
			onClick={() => {
				void handleLogin();
			}}
		>
			Login
		</NavItem>
	);
}
