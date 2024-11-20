"use client";

import { Avatar, Button, Container } from "octagon-ui";

import { handleSignOut } from "./actions";

export const Profile = () => {
	return (
		<Container align="center">
			<Avatar alt="foto de perfil" size={180} src="https://avatar.iran.liara.run/public/57" />
			<Button
				onClick={() => {
					void handleSignOut();
				}}
				variant="primary"
				label="cerrar sesion"
			/>
		</Container>
	);
};
