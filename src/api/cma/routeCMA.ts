import { Hono } from "hono";

import { routeAuth } from "./auth/routeAuth";
import { routeCourses } from "./courses/routeCourses";
import { routeUsers } from "./users/routeUsers";

export const routeCMA = (): Hono => {
	const app = new Hono();
	routeAuth(app);
	routeCourses(app);
	routeUsers(app);

	return app;
};
