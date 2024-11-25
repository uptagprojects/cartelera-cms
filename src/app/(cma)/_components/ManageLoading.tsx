"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Container } from "octagon-ui";

export default function ManageLoading() {
	return (
		<Container display align="center">
			<DotLottieReact src="/animations/ghost.lottie" loop autoplay />
		</Container>
	);
}
