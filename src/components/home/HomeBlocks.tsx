"use client";
import Link from "next/link";
import { Button, Container } from "octagon-ui";

export function HomeBlocks() {
	return (
		<>
			<Container center={true} display={true}>
				<h2>Somos tecnologia</h2>
				<Link href="/news">
					<Button variant="primary" label="revisa la cartelera" />
				</Link>
			</Container>
			<Container center display>
				<h3>Aun no tenemos horarios disponibles</h3>
				<Button variant="tertiary" label="" />
			</Container>
			<Container center display>
				<h3>Estamos en la semana</h3>
				<span>1</span>
			</Container>
			<Container center display>
				<h3>Sigamos aprendiendo</h3>
				<Button variant="primary" label="buscar cursos" />
			</Container>
		</>
	);
}
