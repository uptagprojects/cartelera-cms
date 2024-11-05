import { Service } from "diod";
import removeMd from "remove-markdown";

import { MarkdownRemover } from "../domain/MarkdownRemover";

@Service()
export class OfficialMarkdownRemover extends MarkdownRemover {
	async remove(value: string, maxValue?: number): Promise<string> {
		const sanitizedValue = removeMd(value, {
			listUnicodeChar: "",
			gfm: true,
			useImgAltText: true
		});

		if (!maxValue) {
			return sanitizedValue;
		}

		if (value.length <= maxValue) {
			return sanitizedValue;
		}

		const cuttedContent = value.substring(0, maxValue - 3);

		return `${cuttedContent.substring(0, cuttedContent.lastIndexOf(" "))}...`;
	}
}
