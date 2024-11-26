"use client";
import { Alert, Avatar, Button, Container, FileUploader, Modal, TextInput } from "octagon-ui";
import { useActionState, useCallback, useState } from "react";

import { IManageUser } from "../types";
import { saveUser } from "./actions";
import { customFetch } from "../../../../../lib/fetch";

export const UserForm = ({ id, initUser }: { id: string; initUser?: IManageUser }) => {
	const [errors, saveFormAction, isPending] = useActionState(saveUser, {});
	const [name, setName] = useState(initUser?.name ?? "");
	const [email, setEmail] = useState(initUser?.email ?? "");
	const [avatar, setAvatar] = useState(initUser?.avatar ?? "");
	const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);
	const [imageUploadError, setImageUploadError] = useState<string | null>(null);

	const handleAvatarUpload = useCallback(
		([image]: File[]): void => {
			const formData = new FormData();
			setAvatar(URL.createObjectURL(image));
			formData.append("image", image);
			customFetch(`/api/manage/image/upload`, {
				method: "POST",
				body: formData
			})
				.then(res => res.json())
				.then(res => setAvatar(res.url))
				.catch(err => setImageUploadError(err.message))
				.finally(() => setIsImageDialogOpen(false));
			setIsImageDialogOpen(false);
		},
		[setAvatar]
	);

	return (
		<form action={saveFormAction}>
			<Container align="center">
				{imageUploadError && (
					<Alert
						title="Ocurrió un error subiendo la imagen"
						message={imageUploadError}
						onClose={() => {
							setImageUploadError(null);
						}}
					/>
				)}
				<div
					onClick={() => {
						setIsImageDialogOpen(true);
					}}
				>
					<Avatar size={120} src={avatar} alt="foto de perfil" />
				</div>
			</Container>
			<input type="hidden" name="id" value={id} />
			<input type="hidden" name="avatar" value={avatar} />
			<TextInput
				label="Nombre"
				name="name"
				value={name}
				disabled={isPending}
				errorMessage={errors.name}
				onChange={e => setName(e.target.value)}
			/>

			<TextInput
				label="Correo electrónico"
				name="email"
				value={email}
				disabled={isPending}
				errorMessage={errors.email}
				onChange={e => setEmail(e.target.value)}
			/>

			<Modal
				open={isImageDialogOpen}
				onClose={() => {
					setIsImageDialogOpen(false);
					setAvatar(initUser?.avatar ?? "");
				}}
				closeLabel="Cancelar"
				header={{
					title: "Subir foto de perfil"
				}}
			>
				<FileUploader
					multiple={false}
					mimeType={{
						"image/png": [".png"],
						"image/jpeg": [".jpeg", ".jpg"],
						"image/gif": [".gif"],
						"image/svg+xml": [".svg"],
						"image/webp": [".webp"]
					}}
					label="Sube tu imagen (.jpg, .png, .webp o .svg)"
					onUploadFiles={handleAvatarUpload}
				/>
			</Modal>

			<Button type="submit" variant="primary" disabled={isPending} label="Guardar" />
		</form>
	);
};
