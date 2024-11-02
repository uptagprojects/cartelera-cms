export interface IGuide {
	id: string;
	title: string;
	content: string;
	professor: {
		id: string;
		name: string;
		badge: string;
	};
	image: string;
}
