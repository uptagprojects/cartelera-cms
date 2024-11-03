import { Before, BeforeAll } from "@cucumber/cucumber";
import { createServer } from "http";
import next from "next";
import { parse } from "url";

import { PostgresConnection } from "../../../src/contexts/shared/infrastructure/PostgresConnection";

const connection = new PostgresConnection();

BeforeAll(async () => {
	const port = parseInt(process.env.PORT ?? "3000", 10);
	const app = next({ dev: false });
	const handle = app.getRequestHandler();

	await app.prepare();

	createServer((req, res) => {
		const parsedUrl = parse(req.url ?? "", true);
		handle(req, res, parsedUrl)
			.then(() => {
				// eslint-disable-next-line no-console
				console.log(`> Server listening at http://127.0.0.1:${port}`);
			})
			.catch((err: unknown) => {
				throw err;
			});
	}).listen(port);
});

Before(async () => {
	await connection.truncateAll();
});
