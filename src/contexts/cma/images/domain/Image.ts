import { ImageContent } from "./ImageContent";
import { ImageId } from "./ImageId";
import { ImageURL } from "./ImageURL";

export type ImagePrimitives = {
    id: string;
    url: string;
};

export class Image {
    constructor(
        readonly id: ImageId,
        readonly content: ImageContent,
        private url: ImageURL
    ) {}

    static create(id: string, content: Buffer): Image {
        return new Image(new ImageId(id), new ImageContent(content), new ImageURL(""));
    }

    static fromPrimitives(primitives: ImagePrimitives): Image {
        return new Image(new ImageId(primitives.id), new ImageContent(Buffer.from("")), new ImageURL(primitives.url));
    }

    toPrimitives(): ImagePrimitives {
        return {
            id: this.id.value,
            url: this.url.value
        };
    }

    updateURL(url: string): void {
        this.url = new ImageURL(url);
    }
}
