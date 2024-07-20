import { type Hono } from "hono";

import { getAvailableCourses } from "./getAvailableCourses.controller";
import { getOneCourse } from "./getOneCourse.controller";

export const routeCourses = (app: Hono): void => {
	app.get("/courses/:courseId", c => getOneCourse(c));
	app.get("/courses", c => getAvailableCourses(c));
};
