import * as React from "react";

import Page from "../../../../src/app/page";

describe("Home", () => {
	it("should render a heading", () => {
		cy.viewport(1920, 1080);
		cy.mount(<Page />);

		cy.get("h1").contains("Heading");

		// Validate that a link with the expected URL is present
		// Following the link is better suited to an E2E test
		//cy.get('a[href="/about"]').should('be.visible')
	});
});
