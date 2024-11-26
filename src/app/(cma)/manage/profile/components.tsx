"use client";

import { Avatar, Button, Container } from "octagon-ui";

import { IManageUser } from "../users/types";
import { handleSignOut } from "./actions";

export const Profile = ({ email, avatar }: IManageUser) => {
	return (
		<Container align="center">
			<Avatar alt="foto de perfil" size={180} src={avatar} />
			<h3>{email}</h3>
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
