import { FC } from "react";

type TVModeCardProps = {
	title: string;
	author: string;
	image: string;
};

export const TVModeCard: FC<TVModeCardProps> = ({ image }) => {
	const valid = URL.canParse(image);

	return (
		<div
			className="card"
			style={
				{
					"--background-card": valid ? `url(${image})` : "var(--sunset-gradient)"
				} as React.CSSProperties
			}
		/>
	);
};
