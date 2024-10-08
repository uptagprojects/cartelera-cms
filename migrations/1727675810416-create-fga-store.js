"use strict";
const { OpenFgaClient } = require("@openfga/sdk");
const { appendFileSync } = require("fs");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

module.exports.up = async function () {
	const fgaClient = new OpenFgaClient({
		apiUrl: process.env.FGA_API_URL ?? "http://localhost:8080"
	});
	const { id } = await fgaClient.createStore({
		name: process.env.FGA_STORE_NAME ?? "cartelera"
	});
	console.log("store id: ", id);
	console.log("please keep it safe");

	if (process.env.NODE_ENV !== "production") {
		appendFileSync(path.resolve(__dirname, "../", ".env"), `FGA_STORE_ID=${id}\n`);
	}
};

module.exports.down = async function () {
	const fgaClient = new OpenFgaClient({
		apiUrl: process.env.FGA_API_URL ?? "http://localhost:8080",
		storeId: process.env.FGA_STORE_ID
	});
	await fgaClient.deleteStore();
};
