import { UrlValueObject } from "../../../../shared/domain/UrlValueObject";

export class ProfessorAvatar extends UrlValueObject {
	constructor(value: string) {
		super(new URL(value));
	}
}
