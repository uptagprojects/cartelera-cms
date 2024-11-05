import { BeforeStep, Then, When } from "@cucumber/cucumber";
import { APIResponse, expect, request } from "@playwright/test";

BeforeStep(async function () {
	if (!this.context) {
		this.context = await request.newContext({
			baseURL: "http://127.0.0.1:3000"
		});
	}
});

When("I send a GET request to {string}", async function (route: string) {
	this._request = {
		method: "get",
		route
	};
});

When("I send a POST request to {string} without body", async function (route: string) {
	this._request = {
		method: "post",
		route,
		headers: {
			Accept: "application/json"
		}
	};
});

When("I send a POST request to {string} with body:", async function (route: string, body: string) {
	this._request = {
		method: "post",
		route,
		data: JSON.parse(body),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	};
});

When("I send a PUT request to {string} without body", async function (route: string) {
	this._request = {
		method: "put",
		route,
		headers: {
			Accept: "application/json"
		}
	};
});

When("I send a PUT request to {string} with body:", async function (route: string, body: string) {
	this._request = {
		method: "put",
		route,
		data: JSON.parse(body),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	};
});

When("I send a DELETE request to {string}", async function (route: string) {
	this._request = {
		method: "delete",
		route,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	};
});

Then("the response status should be {int}", async function (status: number) {
	const response = (await this.context[this._request.method](this._request.route, {
		data: this._request.data,
		headers: this._request.headers
	})) as APIResponse;
	this._response = response;
	expect(response.status()).toBe(status);
});

Then("the response content should be empty", async function () {
	expect(await this._response.text()).toBe("");
});

Then("the response content should be:", async function (content: string) {
	const body = await this._response.json();
	expect(body).toEqual(JSON.parse(content));
});
