"use client";

import { signOut } from "next-auth/react";
import { Avatar, Button, Container } from "octagon-ui";

import { IManageUser } from "../users/types";

export const Profile = ({ email, avatar }: IManageUser) => {
	return (
		<Container align="center">
			<Avatar alt="foto de perfil" size={180} src={avatar} />
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
