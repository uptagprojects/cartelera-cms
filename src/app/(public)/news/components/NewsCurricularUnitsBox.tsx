"use client";

import { Card, CardHeader, Tag } from "octagon-ui";
import React, { FC } from "react";

import { IUC } from "./IUC";
import styles from "./News.module.css";

interface NewsCurricularUnitsBoxProps {
	ucs: IUC[];
}

const colors = ["orange", "cyan", "magenta", "moss"];

export const NewsCurricularUnitsBox: FC<NewsCurricularUnitsBoxProps> = ({ ucs }) => {
	return (
		<Card hover={false} className={styles.uc}>
			<CardHeader title="Unidades Curriculares" />
			<table>
				<tbody>
					{ucs.map((unit, i) => (
						<tr key={unit.name}>
							<td>{unit.name}</td>
							<td>
								<Tag color={colors[i % 4]} label={`${unit.totalGuides} guías`} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Card>
	);
};
