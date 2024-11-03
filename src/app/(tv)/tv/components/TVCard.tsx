import { Card } from "octagon-ui";
import React, { FC } from "react";

type TVCardProps = {
	title: string;
	image: string;
};

export const TVCard: FC<TVCardProps> = ({ title, image }) => {
	const valid = URL.canParse(image);

	return (
		<Card image={image} aspectRatio="portrait">
			<p>{title}</p>
		</Card>
	);
};
