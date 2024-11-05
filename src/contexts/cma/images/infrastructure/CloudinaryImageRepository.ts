import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import { Image } from "../domain/Image";
import { ImageRepository } from "../domain/ImageRepository";

export class CloudinaryImageRepository implements ImageRepository {
	constructor() {
		cloudinary.config({
			secure: true
		});
	}

	async save(img: Image): Promise<void> {
		const result = await new Promise<UploadApiResponse | undefined>((res, rej) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "image",
						public_id: img.id.value
					},
					(error, result) => {
						error ? rej(error) : res(result);
					}
				)
				.end(img.content.value);
		});

		if (result) {
			img.updateURL(result.secure_url);
		}
	}
}
