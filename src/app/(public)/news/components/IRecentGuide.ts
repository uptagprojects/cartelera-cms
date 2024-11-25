export interface IRecentGuide {
	id: string;
	title: string;
	contentWrapped: string;
	image: string;
	area: string;
	publishDate: string;
	professor: {
		id: string;
		name: string;
		avatar: string;
	};
}
