import { When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { request } from "./request";
let _response: Response;

When("I send a GET request to {string}", async (route: string) => {
    _response = await request("GET", route);
});

When("I send a POST request to {string} without body", async (route: string) => {
    _response = await request("POST", route);
});

When("I send a POST request to {string} with body:", async (route: string, body) => {
    _response = await request("POST", route, body);
});

When("I send a PUT request to {string} without body:", async (route: string) => {
    _response = await request("PUT", route);
});

When("I send a PUT request to {string} with body:", async (route: string, body) => {
    _response = await request("PUT", route, body);
});

When("I send a DELETE request to {string}", async (route: string) => {
    _response = await request("DELETE", route);
});

Then("the response status should be {int}", (status: number) => {
    assert.equal(_response.status, status);
})

Then("the response should be empty", () => {
    assert.deepEqual(_response.body, "");
})

Then("the response content should be:", async (content: string) => {
    assert.deepEqual(_response.headers.get("Content-Type"), "application/json");
    const body = await _response.json();
    assert.deepEqual(body, JSON.parse(content));
});