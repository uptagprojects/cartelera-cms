import { UC, UCPrimitives } from "../../../../../src/contexts/cma/uc/domain/UC";
import { UCIdMother } from "./UCIdMother";
import { UCNameMother } from "./UCNameMother";

export class UCMother {
static create(params?: Partial<UCPrimitives>): UC {
const primitives: UCPrimitives = {
id: UCIdMother.create().value,
name: UCNameMother.create().value,
...params
};

return UC.fromPrimitives(primitives);
}
}
