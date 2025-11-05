"use client";

import { useRouter } from "next/navigation";
import { NavItem } from "octagon-ui";

import { createClient } from "../../lib/supabase/client";

export function LogoutButton() {
	const supabase = createClient();
	const router = useRouter();

	const handleSignOut = async (): Promise<void> => {
		await supabase.auth.signOut();
		router.refresh();
	};

	return (
		<NavItem
			onClick={() => {
				void handleSignOut();
			}}
		>
			Cerrar Sesión
		</NavItem>
	);
}
