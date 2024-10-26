import { type Hono } from "hono";
import { postEventBus } from "./postEventBus.controller";
export const routeEventBus = (app: Hono): void => {
    app.post("/event_bus", c => postEventBus(c));
};
