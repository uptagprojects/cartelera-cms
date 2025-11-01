export interface IActivity {
    id: string;
    type: string;
    title: string;
    context: string;
    publishedDate: string;
}

export type ActivityType = "announcement" | "guide" | "event" | "course" | "schedule";
