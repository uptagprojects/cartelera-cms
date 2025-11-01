import { UCId } from "./UCId";
import { UCName } from "./UCName";
import { UCTotalGuides } from "./UCTotalGuides";

export interface UCPrimitives {
    id: string;
    name: string;
    totalGuides: number;
}

export class UC {
    constructor(
        private readonly id: UCId,
        private name: UCName,
        private totalGuides: UCTotalGuides
    ) {}

    static create(id: string, name: string): UC {
        const uc = new UC(new UCId(id), new UCName(name), new UCTotalGuides(0));

        return uc;
    }

    static fromPrimitives(plainData: UCPrimitives): UC {
        return new UC(new UCId(plainData.id), new UCName(plainData.name), new UCTotalGuides(plainData.totalGuides));
    }

    toPrimitives(): UCPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            totalGuides: this.totalGuides.value
        };
    }

    updateName(name: string): void {
        this.name = new UCName(name);
    }

    increaseTotalGuides(): void {
        this.totalGuides = new UCTotalGuides(this.totalGuides.value + 1);
    }

    decreaseTotalGuides(): void {
        this.totalGuides = new UCTotalGuides(this.totalGuides.value - 1);
    }
}
