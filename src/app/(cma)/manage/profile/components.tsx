"use client";

import { signOut } from "next-auth/react";
import { Avatar, Button, Container } from "octagon-ui";

import { useGetProfile } from "./actions";

export const Profile = () => {
	const { name, email, avatar } = useGetProfile();

	return (
		<Container align="center">
			<Avatar alt="foto de perfil" size={180} src={avatar} />
			<p>Hola, {name}</p>
			<h3>{email}</h3>
			<Button
				onClick={() => {
					void signOut({
						redirectTo: "/",
						redirect: true
					});
				}}
				variant="primary"
				label="cerrar sesion"
			/>
		</Container>
	);
};
