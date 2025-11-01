import { Service } from "diod";

import { UC } from "./UC";
import { UCDoesNotExist } from "./UCDoesNotExist";
import { UCId } from "./UCId";
import { UCRepository } from "./UCRepository";

@Service()
export class UCFinder {
    constructor(private readonly repository: UCRepository) {}

    async find(id: string): Promise<UC> {
        const uc = await this.repository.search(new UCId(id));
        if (!uc) {
            throw new UCDoesNotExist(id);
        }

        return uc;
    }
}
