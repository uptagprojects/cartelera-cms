import { LucideCircleChevronLeft, LucideCircleChevronRight } from "lucide-react";
import { Progress } from "octagon-ui";
import { FC } from "react";

import { IActivity } from "../services/IActivity";
import styles from "./TV.module.css";
import { TVCard } from "./TVCard";

type TVCardSlidesProps = {
	activities: IActivity[];
};

export const TVCardSlides: FC<TVCardSlidesProps> = ({ activities }) => {
	return (
		<section className={styles.tvCardSlides}>
			<div className={styles.tvCardSlidesWrapper}>
				{activities.map((activity, index) => (
					<TVCard key={index} title={activity.event} image={activity.image} />
				))}
			</div>
			<nav className={styles.tvCardSlidesNavigation}>
				<LucideCircleChevronLeft color="#fff" />
				<LucideCircleChevronRight color="#fff" />
				<Progress
					size="small"
					label="time passed before unmount"
					hideLabel
					value={0}
					max={3000}
				/>
			</nav>
		</section>
	);
};
