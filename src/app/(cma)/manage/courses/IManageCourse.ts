export interface IManageCourse {
    id: string;
    name: string;
    abstract: string;
    instructor: {
        name: string;
        badge: string;
        email: string;
        avatar: string;
        relatedUrl: string;
    };
    picture: string;
    location: string;
    duration: {
        startDate: string;
        finishDate: string;
        academicHours: number;
    };
    price: number;
    creation: string;
    lastUpdate: string;
}
