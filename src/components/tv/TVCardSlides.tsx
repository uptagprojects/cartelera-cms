import { FC } from "react";

import { IGuide } from "../../lib/guides/IGuide";

type TVCardSlidesProps = {
	guides: IGuide[];
};

export const TVCardSlides: FC<TVCardSlidesProps> = ({ guides }) => {
	return (
		<div className="card-slides">
			{guides.map(guide => (
				<div key={guide.id} className="card-slide">
					<div
						className="card"
						style={
							{
								"--background-card": `url(${guide.image})`
							} as React.CSSProperties
						}
					/>
				</div>
			))}
		</div>
	);
};
