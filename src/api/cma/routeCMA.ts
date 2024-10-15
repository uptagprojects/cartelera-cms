import { Hono } from "hono";

import { routeAuth } from "./auth/routeAuth";
import { routeCourses } from "./courses/routeCourses";

export const routeCMA = (): Hono => {
	const app = new Hono();
	routeAuth(app);
	routeCourses(app);

	return app;
};
