export interface IRecentGuide {
	id: string;
	title: string;
	contentWrapped: string;
	image: string;
	area: string;
	professor: {
		id: string;
		name: string;
		avatar: string;
	};
}
