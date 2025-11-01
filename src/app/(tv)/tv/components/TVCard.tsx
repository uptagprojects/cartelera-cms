import { Card } from "octagon-ui";
import React, { FC } from "react";

type TVCardProps = {
    title: string;
};

export const TVCard: FC<TVCardProps> = ({ title }) => {
    return (
        <Card aspectRatio="portrait">
            <p>{title}</p>
        </Card>
    );
};
