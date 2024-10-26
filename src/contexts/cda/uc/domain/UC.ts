import { UCId } from "./UCId";
import { UCName } from "./UCName";

export interface UCPrimitives {
	id: string;
	name: string;
}

export class UC {
	private readonly id: UCId;
	private readonly name: UCName;

	constructor(id: UCId, name: UCName) {
		this.id = id;
		this.name = name;
	}

	static fromPrimitives(plainData: UCPrimitives): UC {
		return new UC(new UCId(plainData.id), new UCName(plainData.name));
	}

	toPrimitives(): UCPrimitives {
		return {
			id: this.id.value,
			name: this.name.value
		};
	}
}
