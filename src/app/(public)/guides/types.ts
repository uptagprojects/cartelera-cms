import { IRecentGuide } from "../news/components/IRecentGuide";

export type IManageGuideAttachment = string;

export enum GuideActionTypes {
    LOAD_MORE = "LOAD_MORE",
    LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS",
    LOAD_MORE_ERROR = "LOAD_MORE_ERROR"
}

export interface GuideAction {
    type: GuideActionTypes;
    payload: IRecentGuide[] | IRecentGuide | string | null;
}

export interface GuideState {
    guides: Record<string, IRecentGuide>;
    indexes: Set<string>;
    page: number;
    fetchPending: boolean;
    noMoreAvailable: boolean;
}
