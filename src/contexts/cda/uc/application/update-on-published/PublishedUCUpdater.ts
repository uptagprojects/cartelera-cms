import { Service } from "diod";

import { UC } from "../../domain/UC";
import { UCId } from "../../domain/UCId";
import { UCRepository } from "../../domain/UCRepository";

@Service()
export class PublishedUCUpdater {
    constructor(private readonly repository: UCRepository) {}

    async update(id: string, name: string): Promise<void> {
        let uc = await this.repository.search(new UCId(id));

        if (!uc) {
            uc = UC.create(id, name);
        } else {
            uc.updateName(name);
        }

        await this.repository.save(uc);
    }
}
