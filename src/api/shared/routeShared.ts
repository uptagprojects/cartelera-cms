import { Hono } from "hono";
import { routeEventBus } from "./event-bus/routeEventBus";

export const routeShared = (): Hono => {
	const app = new Hono();
	routeEventBus(app);

	return app;
};