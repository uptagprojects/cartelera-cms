export interface IManageAnnouncement {
    id: string;
    title: string;
    content: string;
    publishDate: string;
    type: string;
    status: string;
}

export enum AnnouncementActionTypes {
    LOAD_MORE = "LOAD_MORE",
    LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS",
    LOAD_MORE_ERROR = "LOAD_MORE_ERROR",
    REMOVE = "REMOVE"
}

export interface AnnouncementAction {
    type: AnnouncementActionTypes;
    payload: IManageAnnouncement[] | IManageAnnouncement | string | null;
}

export interface AnnouncementState {
    announcements: Record<string, IManageAnnouncement>;
    indexes: Set<string>;
    page: number;
    fetchPending: boolean;
    noMoreAvailable: boolean;
}
