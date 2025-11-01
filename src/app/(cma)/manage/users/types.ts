export interface IManageUser {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    avatar: string;
    status: string;
}

export enum UserActionTypes {
    LOAD_MORE = "LOAD_MORE",
    LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS",
    LOAD_MORE_ERROR = "LOAD_MORE_ERROR",
    REMOVE = "REMOVE"
}

export interface UserAction {
    type: UserActionTypes;
    payload: IManageUser[] | IManageUser | string | null;
}

export interface UserState {
    users: Record<string, IManageUser>;
    indexes: Set<string>;
    page: number;
    fetchPending: boolean;
    noMoreAvailable: boolean;
}
