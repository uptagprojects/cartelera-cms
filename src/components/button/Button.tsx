import { MouseEventHandler, ReactNode } from "react";

import classNames from "./button.module.css";

export type ButtonProps = {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	style?: React.CSSProperties;
	className?: string;
};
export const Button = ({ onClick, children, style, className = "" }: ButtonProps) => (
	<button className={classNames.button.concat(className)} onClick={onClick} style={style}>
		{children}
	</button>
);
