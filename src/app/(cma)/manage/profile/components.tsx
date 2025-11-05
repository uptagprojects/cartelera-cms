"use client";

import { User } from "@supabase/supabase-js"; // Import the User type
import { useRouter } from "next/navigation";
import { Avatar, Button, Container } from "octagon-ui";

import { createClient } from "../../../../lib/supabase/client"; // For sign-out

interface ProfileProps {
	user: User;
}

export const Profile = ({ user }: ProfileProps) => {
	const supabase = createClient();
	const router = useRouter();

	const handleSignOut = async (): Promise<void> => {
		await supabase.auth.signOut();
		router.refresh();
	};

	// Extract profile data from the Supabase user object
	const email = user.email ?? "No email provided";
	const name = user.user_metadata.full_name || user.user_metadata.name || "User";
	const avatar = user.user_metadata.avatar_url || null;

	return (
		<Container align="center">
			<Avatar alt="foto de perfil" size={180} src={avatar} />
			<p>Hola, {name}</p>
			<h3>{email}</h3>
			<Button
				onClick={() => {
					void handleSignOut(); // Call our new sign-out function
				}}
				variant="primary"
				label="cerrar sesion"
			/>
		</Container>
	);
};
