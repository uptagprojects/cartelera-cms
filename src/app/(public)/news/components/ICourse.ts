export interface ICourse {
    id: string;
    name: string;
    abstract: string;
    startDate: string;
    finishDate: string;
    image: string;
    instructor: {
        name: string;
        avatar: string;
        badge: string;
    };
    duration: {
        startDate: string;
        finishDate: string;
        academicHours: number;
    };
}
