"use client";
import {
	Avatar,
	Button,
	Card,
	CardFooter,
	CardHeader,
	DatePicker,
	TextArea,
	TextInput
} from "octagon-ui";
import { useActionState, useState } from "react";

import { IManageCourse } from "../IManageCourse";
import { saveCourse } from "./actions";

export const CourseForm = ({ id, initCourse }: { id: string; initCourse?: IManageCourse }) => {
	const [errors, saveFormAction, isPending] = useActionState(saveCourse, {});
	const [name, setName] = useState(initCourse?.name ?? "");
	const [abstract, setAbstract] = useState(initCourse?.abstract ?? "");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState<Date>();

	const onChangeDates = (dates: Date[]) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

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
			<DatePicker
				selectsRange
				label="Fecha"
				name="startDate"
				dateFormat="dd/MM/yyyy"
				selected={startDate}
				onChange={dates => onChangeDates(dates as Date[])}
				startDate={startDate}
				endDate={endDate}
			/>
			<label>
				<span>Horas academicas</span>
				<input type="number" name="academicHours" min={1} />
			</label>
			<TextArea
				label="Abstracto"
				name="abstract"
				placeholder="De que trata el curso?"
				errorMessage={errors.abstract}
				disabled={isPending}
				value={abstract}
				onChange={e => setAbstract(e.target.value)}
			/>
			<Card hover={false}>
				<CardHeader title="Instructor" />
				<Avatar size={128} src="/octagon.svg" alt="foto de perfil del instructor" />
				<TextInput name="instructorName" label="Nombre" />
				<TextInput name="instructorBadge" label="Profesion" />
				<TextInput name="instructorEmail" label="Correo Electronico" />
				<TextInput
					name="instructorRelatedUrl"
					label="URL relacionada (perfil profesional de Twitter, LinkedIn, Github, etc.)"
				/>
				<CardFooter>
					<p>
						El correo electronico de los instructores no sera publicado en el sitio web
						del PNFi.
					</p>
				</CardFooter>
			</Card>
			<Button type="submit" disabled={isPending} label="Guardar" />
		</form>
	);
};
