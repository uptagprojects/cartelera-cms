export interface IGuide {
	id: string;
	title: string;
	content: string;
	area: string;
	professor: {
		id: string;
		name: string;
		avatar: string;
	};
	image: string;
	publishDate: string;
}
