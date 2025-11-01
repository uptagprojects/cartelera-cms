import { LucideCircleChevronLeft, LucideCircleChevronRight } from "lucide-react";
import { Container, Progress } from "octagon-ui";
import { FC, useEffect, useState } from "react";

import { IActivity } from "../services/IActivity";
import styles from "./TV.module.css";
import { TVCard } from "./TVCard";

type TVCardSlidesProps = {
    activities: IActivity[];
    currentIndex: number;
};

export const TVCardSlides: FC<TVCardSlidesProps> = ({ activities, currentIndex }) => {
    const [progress, setProgress] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => p + 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setProgress(1000);
    }, [currentIndex]);

    return (
        <Container className={styles.tvCardSlides}>
            <div className={styles.tvCardSlidesWrapper}>
                {activities.map((activity, index) => (
                    <TVCard key={index} title={activity.title} />
                ))}
            </div>
            <nav className={styles.tvCardSlidesNavigation}>
                <LucideCircleChevronLeft className={styles.tvCardSlidesNavigationIcon} />
                <LucideCircleChevronRight className={styles.tvCardSlidesNavigationIcon} />
                <Progress size="small" label="" hideLabel value={progress} max={3000} />
            </nav>
        </Container>
    );
};
