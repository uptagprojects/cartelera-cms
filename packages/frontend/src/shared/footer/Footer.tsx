import Image from "next/image";

import ccIcon from "../../shared/icons/cc.svg";
import cc40Icon from "../../shared/icons/cc-40.svg";
import githubIcon from "../../shared/icons/github.svg";

export const Footer = () => (
	<footer>
		<figure>
			<figcaption>Inicio</figcaption>
			<ul>
				<li>Guias</li>
				<li>Cursos</li>
				<li>Eventos</li>
				<li>Calendario</li>
				<li>Modo TV</li>
			</ul>
		</figure>
		<figure>
			<figcaption>Contribuir</figcaption>
			<ul>
				<li>Design System</li>
				<li>GitHub</li>
				<li>Issues</li>
				<li>Discord</li>
			</ul>
		</figure>
		<figure>
			<figcaption>UPTAG</figcaption>
			<ul>
				<li>Web</li>
				<li>Horarios</li>
				<li>Malla Curricular</li>
				<li>SIACE</li>
				<li>PNFi-CMS</li>
			</ul>
		</figure>
		<hr className="separator" />
		<Image src={ccIcon} width={24} height={24} alt="Creative Commons License logo" />
		<Image src={cc40Icon} width={24} height={24} alt="Creative Commons 4.0 License logo" />
		<Image src={githubIcon} width={24} height={24} alt="GitHub logo" />
	</footer>
);
