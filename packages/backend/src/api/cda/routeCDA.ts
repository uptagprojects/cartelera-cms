import { Hono } from "hono";

import { routeCourses } from "./courses/routeCourses";

export const routeCDA = (): Hono => {
	const app = new Hono();
	routeCourses(app);

	return app;
};
