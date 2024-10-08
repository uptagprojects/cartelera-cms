import { type Hono } from "hono";

import { authLocal } from "./authLocal.controller";

export const routeAuth = (app: Hono): void => {
	app.post("/local", c => authLocal(c));
};
