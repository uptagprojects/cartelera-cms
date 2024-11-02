import { TV } from "../../../components/tv/TV";
import { IGuide } from "../../../lib/guides/IGuide";

export default async function TVPage() {
	const guides = await fetch("http://localhost:3000/api/guides/").then(
		res => res.json() as Promise<IGuide[]>
	);

	console.log(guides);

	return <TV guides={guides} />;
}
