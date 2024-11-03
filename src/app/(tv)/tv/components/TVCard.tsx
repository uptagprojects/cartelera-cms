import Image from "next/image";
import { Frame } from "octagon-ui";
import React, { FC } from "react";

type TVCardProps = {
	title: string;
	image: string;
};

export const TVCard: FC<TVCardProps> = ({ title, image }) => {
	const valid = URL.canParse(image);

	return (
		<Frame aspectRatio="portrait" caption={title}>
			<Image src={valid ? image : "/logo.svg"} alt={title} width={9} height={16} />
		</Frame>
	);
};
