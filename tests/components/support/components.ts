import "../../cypress.d";
import "../../../src/app/globals.css";
import { mount } from "cypress/react18";

Cypress.Commands.add("mount", mount);
