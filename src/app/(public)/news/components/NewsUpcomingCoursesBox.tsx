import React, { FC } from "react";
import { ICourse } from "./ICourse";
import { Card, CardHeader, CardFooter, Avatar } from "octagon-ui";

export const NewsUpcomingCoursesBox: FC<{ courses: ICourse[] }> = ({ courses }) => {
    return (
        <aside>
            <h2>Proximos Cursos</h2>
            {courses.map(course => (
                <Card>
                    <CardHeader title={course.name} subtitle={`${course.startDate} - ${course.finishDate}`} />
                    <p>{course.abstract}</p>
                    <CardFooter>
                        <Avatar src={course.instructor.avatar} alt={course.instructor.name} />
                        <p>{course.instructor.name}</p>
                    </CardFooter>
                </Card>
            ))}
        </aside>
    );
}