import { ProfessorAvatar } from "./ProfessorAvatar";
import { ProfessorId } from "./ProfessorId";
import { ProfessorName } from "./ProfessorName";

export type ProfessorPrimitives = {
	id: string;
	name: string;
	avatar: string;
};

export class Professor {
	constructor(
		readonly id: ProfessorId,
		readonly name: ProfessorName,
		readonly avatar: ProfessorAvatar
	) {}

	static fromPrimitives(plainData: ProfessorPrimitives): Professor {
		return new Professor(
			new ProfessorId(plainData.id),
			new ProfessorName(plainData.name),
			new ProfessorAvatar(plainData.avatar)
		);
	}

	toPrimitives(): ProfessorPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			avatar: this.avatar.value.toString()
		};
	}
}
