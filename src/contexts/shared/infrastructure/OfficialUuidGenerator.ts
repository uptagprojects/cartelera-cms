import { v4 } from "uuid";
import { UuidGenerator } from "../domain/UuidGenerator";
import { Service } from "diod";

@Service()
export class OfficialUuidGenerator extends UuidGenerator {
    async generate() {
        return v4();
    }
}