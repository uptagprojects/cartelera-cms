import { UCId } from './UCId';
import { UCName } from './UCName';

export class UC {
    readonly id: UCId;
    readonly name: UCName;

    constructor(id: UCId, name: UCName,) {
        this.id = id;
        this.name = name;
    }

    static fromPrimitives(plainData: { id: string; name: string; }): UC {
        return new UC(
            new UCId(plainData.id),
            new UCName(plainData.name),
        );
    }

    toPrimitives(): any {
        return {
            id: this.id.value,
            name: this.name.value,
        };
    }
}