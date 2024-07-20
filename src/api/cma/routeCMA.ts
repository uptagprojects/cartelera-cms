import { Hono } from "hono";

import { routeCourses } from "./courses/routeCourses";

export const routeCMA = (): Hono => {
	const app = new Hono();
	routeCourses(app);

	return app;
};
