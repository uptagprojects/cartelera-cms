import { faker } from "@faker-js/faker";

import { UCId } from "../../../../../src/contexts/cma/uc/domain/UCId";

export class UCIdMother {
static create(value?: string): UCId {
return new UCId(value ?? faker.string.uuid());
}
}
