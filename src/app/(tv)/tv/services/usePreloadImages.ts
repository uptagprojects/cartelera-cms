import { useEffect } from "react";

export function usePreloadImages(sources: string[]): void {
	useEffect(() => {
		sources.forEach(src => {
			if (URL.canParse(src)) {
				const image = new Image();
				image.src = src;
			}
		});
	}, [sources]);

	return;
}
