import { Hono } from "hono";

import { routeCDA } from "./cda/routeCDA";
import { routeCMA } from "./cma/routeCMA";
import { routeShared } from "./shared/routeShared";

const app = new Hono().basePath("/api");

app.route("/shared", routeShared());
app.route("/cma", routeCMA());
app.route("/", routeCDA());

export default app;
