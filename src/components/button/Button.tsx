import { ReactNode } from "react";

export type ButtonProps = {
	children: ReactNode;
};
export const Button = ({ children }: ButtonProps) => <button>{children}</button>;
