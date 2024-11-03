import { NextRequest, NextResponse } from "next/server";

import { OfficialUuidGenerator } from "../../../contexts/shared/infrastructure/OfficialUuidGenerator";

const uuidGenerator = new OfficialUuidGenerator();

export async function GET(_req: NextRequest): Promise<Response> {
	return NextResponse.json(
		[
			{
				id: uuidGenerator.generate(),
				event: "Curso de PHP",
				content: "Desde el 1 al 12 de enero",
				image: "https://www.php.net/images/logos/new-php-logo.svg"
			},
			{
				id: uuidGenerator.generate(),
				event: "Nueva guia: uso de Hooks en React",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.",
				image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
			},
			{
				id: uuidGenerator.generate(),
				event: "Pycon 2025",
				content: "Desde el 1 al 12 de febrero en la ciudad de Caracas",
				image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
			}
		],
		{
			status: 200
		}
	);
}
