import { Then, When } from "@cucumber/cucumber";
import * as assert from "assert";

import app from "../../../src/api/handler";

let _response: Response;

When("I send a GET request to {string}", async (route: string) => {
	_response = await app.request(route, {
		method: "GET"
	});
});

When("I send a POST request to {string} without body", async (route: string) => {
	_response = await app.request(route, {
		method: "POST"
	});
});

When("I send a POST request to {string} with body:", async (route: string, body) => {
	_response = await app.request(route, {
		method: "POST",
		body
	});
});

When("I send a PUT request to {string} without body", async (route: string) => {
	_response = await app.request(route, {
		method: "PUT"
	});
});

When("I send a PUT request to {string} with body:", async (route: string, body) => {
	_response = await app.request(route, {
		method: "PUT",
		body
	});
});

When("I send a DELETE request to {string}", async (route: string) => {
	_response = await app.request(route, {
		method: "DELETE"
	});
});

Then("the response status should be {int}", (status: number) => {
	assert.equal(_response.status, status);
});

Then("the response content should be empty", () => {
	assert.deepEqual(_response.body, null);
});

Then("the response content should be:", async (content: string) => {
	assert.deepEqual(_response.headers.get("Content-Type"), "application/json; charset=UTF-8");
	const body = await _response.json();
	assert.deepEqual(body, JSON.parse(content));
});
