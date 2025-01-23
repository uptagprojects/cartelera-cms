import { faker } from "@faker-js/faker";

import { StoredFile } from "../../../../../src/contexts/shared/domain/file-storage/StoredFile";

type StoredFilePrimitives = {
	path: string;
	url: string;
};

export class StoredFileMother {
	static create(params?: Partial<StoredFilePrimitives>): StoredFile {
		const primitives: StoredFilePrimitives = {
			path: faker.system.filePath(),
			url: faker.image.urlPlaceholder(),
			...params
		};

		return StoredFile.fromPrimitives(primitives.path, primitives.url);
	}
}
