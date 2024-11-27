import Link from "next/link";
import { Button, Container } from "octagon-ui";
import { FC } from "react";

type HomeScheduleBlockProps = {
	schedule: string | null;
};

export const HomeScheduleBlock: FC<HomeScheduleBlockProps> = ({ schedule }) => {
	return (
		<Container
			align="left"
			display
			style={{ height: "150%", position: "relative", right: "-25%" }}
		>
			<h3>
				{schedule ? "Nuevos horarios publicados" : "Aún no tenemos horarios disponibles"}
			</h3>
			{schedule && (
				<Link href={`/schedules/${schedule}`}>
					<Button variant="tertiary" label="Ver nuevos horarios" />
				</Link>
			)}
		</Container>
	);
};
