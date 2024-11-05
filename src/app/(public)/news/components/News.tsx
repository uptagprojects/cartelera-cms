"use client";

import { Metadata } from 'next';
import styles from './News.module.css';
import { NewsAnnouncementBox } from './NewsAnnouncementBox';
import { NewsUpcomingEventsBox } from './NewsUpcomingEventsBox';
import { IAnnouncement } from './IAnnouncement';
import { IEvent } from './IEvent';
import { NewsRecentGuidesBox } from './NewsRecentGuidesBox';
import { IRecentGuide } from './IRecentGuide';
import { NewsUpcomingCoursesBox } from './NewsUpcomingCoursesBox';
import { ICourse } from './ICourse';


export const metadata: Metadata = {
	title: "PNFi | Noticias",
	description: "Programa Nacional de Formacion en Informatica"
};

type NewsProps = {
    announcements: IAnnouncement[];
    events: IEvent[];
    guides: IRecentGuide[];
    courses: ICourse[]
}

export function News({ announcements, events, guides, courses }: NewsProps) {
    return (
        <div className={styles.newsContainer}>
            <NewsAnnouncementBox announcements={announcements} />
            <NewsUpcomingEventsBox events={events} />
            <NewsRecentGuidesBox guides={guides} />
            <NewsUpcomingCoursesBox courses={courses} />
            <aside>
                <h2>Unidades Curriculares</h2>
            </aside>
        </div>
    );
}