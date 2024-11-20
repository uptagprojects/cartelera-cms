import { useRouter } from "next/navigation";
import { ManageHeader } from "../../_components/ManageHeader";
import { Button, Card, CardFooter, CardHeader, Container, Spinner, TextInput } from "octagon-ui";
import { IManageUC, deleteUC, saveUCContent, useGetUCs } from "./actions";
import { Suspense, useActionState, useCallback, useRef, useState } from "react";

export const UCHeader = () => {
	const router = useRouter();

	return (
		<ManageHeader
			title="Unidades Curriculares"
			label="crear unidad curricular"
			onClick={() => {
				const id = globalThis.crypto.randomUUID();
				router.push(`/manage/uc/${id}`);
			}}
		/>
	);
};

export const UCLoader = () => (
	<Container display align="center">
		<Spinner />
	</Container>
);

export const UCList = () => {
	const { ucs, remove } = useGetUCs();


	return (
		<Suspense fallback={<UCLoader />}>
			{ucs.map(announcement => (
				<UCListItem key={announcement.id} onDelete={remove} {...announcement} />
			))}
		</Suspense>
	);
};


const UCListItem = ({ id, name, onDelete }: IManageUC & { onDelete: (id: string) => void }) => {
	const [errors, saveNameAction, isPending] = useActionState(saveUCContent, { id });
	const [editing, setEditing] = useState<boolean>(false);
	const [nameValue, setNameValue] = useState<string>(name);

	const ref = useRef<HTMLFormElement>(null);


	const handleDelete = useCallback(() => {
		deleteUC({ id });
		onDelete(id);
	}, [id]);

	return (
		<Card>
			{
				editing ?
					<form action={saveNameAction} ref={ref}>
						<TextInput
							label="nombre"
							size="small"
							value={nameValue}
							disabled={isPending}
							onChange={e => setNameValue(e.target.value)}
							errorMessage={errors.name} />
					</form>
					:
					<>
						<p>{name}</p>
					</>
			}
			<CardFooter>
                <Button icon={editing ? "Check" : "Pencil"} variant="secondary" label={editing ? "terminar edicion" : "editar"} size="small" onClick={() => {
                    setEditing(state => {
                        if (state) {
                            ref?.current?.requestSubmit();
                        }
                        return !state
                    })
                }} />
                <Button icon="Trash" variant="tertiary" label="eliminar" size="small" onClick={handleDelete} />
			</CardFooter>
		</Card>
	)
}