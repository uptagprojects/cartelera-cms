import Link from "next/link";
import { Button, Container } from "octagon-ui";

export default function Home() {
	return (
		<>
			<Container center={true}>
				<h2>Somos tecnologia</h2>
				<Link href="/news">
					<Button variant="primary" label="revisa la cartelera" />
				</Link>
			</Container>
			<Container>
				<h3>Aun no tenemos horarios disponibles</h3>
				<Button variant="tertiary" label="" />
			</Container>
			<Container>
				<h3>Estamos en la semana</h3>
				<span>1</span>
			</Container>
			<Container>
				<h3>Sigamos aprendiendo</h3>
				<Button variant="primary" label="buscar cursos" />
			</Container>
		</>
	);
}
