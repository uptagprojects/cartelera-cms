import { Card, CardHeader } from "octagon-ui";
import React, { FC } from "react";

import { IUC } from "./IUC";

interface NewsCurricularUnitsBoxProps {
	uc: IUC[];
}

export const NewsCurricularUnitsBox: FC<NewsCurricularUnitsBoxProps> = ({ uc }) => {
	return (
		<Card>
			<CardHeader title="Unidades Curriculares" />
			{uc.map(unit => (
				<div key={unit.name}>
					<h3>{unit.name}</h3>
				</div>
			))}
		</Card>
	);
};
