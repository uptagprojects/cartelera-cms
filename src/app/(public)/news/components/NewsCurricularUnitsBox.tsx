"use client";

import { Card, CardHeader, Container } from "octagon-ui";
import React, { FC } from "react";
import styles from "./News.module.css";
import { IUC } from "./IUC";

interface NewsCurricularUnitsBoxProps {
	uc: IUC[];
}

export const NewsCurricularUnitsBox: FC<NewsCurricularUnitsBoxProps> = ({ uc }) => {
	return (
		<Card hover={false} className={styles.uc}>
			<CardHeader title="Unidades Curriculares" />
			{uc.map(unit => (
				<div key={unit.name}>
					<h3>{unit.name}</h3>
				</div>
			))}
		</Card>
	);
};
