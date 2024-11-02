"use client";

import { HomeGuidesBlock } from "./HomeGuidesBlock";
import { HomeHeadingBlock } from "./HomeHeadingBlock";
import { HomeScheduleBlock } from "./HomeScheduleBlock";
import { HomeWeekBlock } from "./HomeWeekBlock";

type HomeProps = {
	week: number;
	schedule: string | null;
};

export function Home({ week, schedule }: HomeProps) {
	return (
		<>
			<HomeHeadingBlock />
			<HomeScheduleBlock schedule={schedule} />
			<HomeWeekBlock week={week} />
			<HomeGuidesBlock />
		</>
	);
}
