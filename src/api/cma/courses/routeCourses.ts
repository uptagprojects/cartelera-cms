import { type Hono } from "hono";

import { getAllCourses } from "./getAllCourses.controller";
import { getOneCourse } from "./getOneCourse.controller";
import { putCourse } from "./putCourse.controller";

export const routeCourses = (app: Hono): void => {
	app.get("/courses/:courseId", c => getOneCourse(c));
	app.put("/courses/:courseId", c => putCourse(c));
	app.get("/courses", c => getAllCourses(c));
};
