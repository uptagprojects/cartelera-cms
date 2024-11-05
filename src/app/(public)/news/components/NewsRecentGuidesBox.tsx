import React, { FC } from "react";
import { Card, CardHeader, CardFooter, Tag, Avatar } from "octagon-ui";
import { IRecentGuide } from "./IRecentGuide"

type NewsRecentGuidesBoxProps = {
    guides: IRecentGuide[];
}
export const NewsRecentGuidesBox: FC<NewsRecentGuidesBoxProps> = ({ guides }) => {
    return (
        <section>
            <h2>Publicaciones recientes</h2>
            {guides.map(guide => (
                <Card
                    key={guide.id}
                    image={guide.image}
                    aspectRatio="portrait"
                >
                    <CardHeader
                        title={guide.title}
                        />
                    <Tag label={guide.area} />
                    <p>{guide.contentWrapped}</p>
                    <CardFooter>
                        <Avatar src={guide.professor.avatar} alt={guide.professor.name} />
                        <p>{guide.professor.name}</p>
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
}