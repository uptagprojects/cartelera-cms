import "../../../src/app/layout.css";

import { faker } from "@faker-js/faker";
import React from "react";

import { Button } from "../../../src/components/button/Button";

it("uses custom text for button", () => {
	const text = faker.string.nanoid();
	cy.mount(<Button>{text}</Button>);
	cy.get("button").should("have.text", text);
});
