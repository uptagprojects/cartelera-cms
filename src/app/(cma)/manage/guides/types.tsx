export interface IManageGuide {
	id: string;
	title: string;
	content: string;
	ucId: string;
	authorId: string;
	status: string;
}

export interface IManageGuideAttachment {
	id: string;
	guideId: string;
	url: string;
}

export enum GuideActionTypes {
	LOAD_MORE = "LOAD_MORE",
	LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS",
	LOAD_MORE_ERROR = "LOAD_MORE_ERROR",
	REMOVE = "REMOVE"
}

export interface GuideAction {
	type: GuideActionTypes;
	payload: IManageGuide[] | IManageGuide | string | null;
}

export interface GuideState {
	guides: Record<string, IManageGuide>;
	indexes: Set<string>;
	page: number;
	fetchPending: boolean;
	noMoreAvailable: boolean;
}
