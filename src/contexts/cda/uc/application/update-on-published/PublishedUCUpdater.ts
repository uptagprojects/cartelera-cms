import { Service } from "diod";
import { UCRepository } from "../../domain/UCRepository";
import { UCId } from "../../domain/UCId";
import { UC } from "../../domain/UC";

@Service()
export class PublishedUCUpdater {
    constructor(
        private readonly repository: UCRepository,
    ) {}

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