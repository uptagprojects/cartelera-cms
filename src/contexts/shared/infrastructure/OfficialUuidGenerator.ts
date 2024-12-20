import { Service } from "diod";
import { v4 } from "uuid";

import { UuidGenerator } from "../domain/UuidGenerator";

@Service()
export class OfficialUuidGenerator extends UuidGenerator {
	async generate(): Promise<string> {
		return v4();
	}
}
