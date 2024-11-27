"use client";

import "./Home.css";

import { Container } from "octagon-ui";

import { HomeGuidesBlock } from "./HomeGuidesBlock";
import { HomeHeadingBlock } from "./HomeHeadingBlock";
import { HomeScheduleBlock } from "./HomeScheduleBlock";
import { HomeScrollSVG } from "./HomeScrollSVG";
import { HomeWeekBlock } from "./HomeWeekBlock";

type HomeProps = {
	week: number;
	schedule: string | null;
};

export function Home({ week, schedule }: HomeProps) {
	return (
		<>
			<Container display style={{ position: "relative" }}>
				<HomeHeadingBlock />
				<HomeScheduleBlock schedule={schedule} />
				<HomeWeekBlock week={week} />
				<HomeGuidesBlock />
				<HomeScrollSVG />
			</Container>
			<div className="animateme">
				<ul className="bg-bubbles">
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
					<li />
				</ul>
			</div>
		</>
	);
}
