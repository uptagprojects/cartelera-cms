export interface IGuide {
	id: string;
	title: string;
	content: string;
	area: string;
	professor: {
		id: string;
		name: string;
		badge: string;
	};
	image: string;
	publishDate: string;
}
