import { faker } from "@faker-js/faker";
import * as React from "react";

import { Button } from "../../../src/components/button/Button";

describe("Button", () => {
	it("uses custom text for button", () => {
		const text = faker.string.nanoid();
		cy.mount(<Button>{text}</Button>);
		cy.get("button").should("have.text", text);
	});

	it("should be clickable", () => {
		cy.mount(<Button onClick={cy.stub().as("clicked")}>hello world</Button>);
		cy.get("button").click();
		cy.get("@clicked").should("have.been.called");
	});
});
