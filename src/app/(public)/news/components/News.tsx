"use client";

import { Metadata } from "next";

import { IAnnouncement } from "./IAnnouncement";
import { ICourse } from "./ICourse";
import { IEvent } from "./IEvent";
import { IRecentGuide } from "./IRecentGuide";
import { IUC } from "./IUC";
import styles from "./News.module.css";
import { NewsAnnouncementBox } from "./NewsAnnouncementBox";
import { NewsCurricularUnitsBox } from "./NewsCurricularUnitsBox";
import { NewsRecentGuidesBox } from "./NewsRecentGuidesBox";
import { NewsUpcomingCoursesBox } from "./NewsUpcomingCoursesBox";
import { NewsUpcomingEventsBox } from "./NewsUpcomingEventsBox";

export const metadata: Metadata = {
    title: "PNFi | Noticias",
    description: "Programa Nacional de Formacion en Informatica"
};

type NewsProps = {
    announcements: IAnnouncement[];
    events: IEvent[];
    guides: IRecentGuide[];
    courses: ICourse[];
    ucs: IUC[];
};

export function News({ announcements, events, guides, courses, ucs }: NewsProps) {
    return (
        <div className={styles.newsContainer}>
            <NewsAnnouncementBox announcements={announcements} />
            <NewsUpcomingEventsBox events={events} />
            <NewsRecentGuidesBox guides={guides} />
            <NewsUpcomingCoursesBox courses={courses} />
            <NewsCurricularUnitsBox ucs={ucs} />
        </div>
    );
}
