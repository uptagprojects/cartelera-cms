"use client";
import { Button, TextInput } from "octagon-ui";
import { useActionState, useState } from "react";

import { IManageUC } from "../actions";
import { saveUC } from "./actions";

export const UCForm = ({ id, initUC }: { id: string; initUC?: IManageUC }) => {
	const [errors, saveFormAction, isPending] = useActionState(saveUC, {});
	const [name, setName] = useState(initUC?.name ?? "");

	return (
		<form action={saveFormAction}>
			<input type="hidden" name="id" value={id} />
			<TextInput
				label="Nombre"
				name="name"
				value={name}
				disabled={isPending}
				errorMessage={errors.name}
				onChange={e => setName(e.target.value)}
			/>
			<Button type="submit" variant="primary" disabled={isPending} label="Guardar" />
		</form>
	);
};
