import { type Hono } from "hono";
import { createUser } from "./createUser.controller";

export const routeUsers = (app: Hono): void => {
    app.put("/users/:userId", c => createUser(c));
//	app.get("/users/:userId", c => getOneUser(c));
//	app.get("/users", c => getAllUsers(c));
};
