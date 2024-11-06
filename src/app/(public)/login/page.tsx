import { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation"
import { signIn, auth } from "../../_auth";
import { AuthError } from "next-auth"
import { Login } from "./components/Login";

export const metadata: Metadata = {
	title: "PNFi | Iniciar Sesion",
	description: "Programa Nacional de Formacion en Informatica"
};

export default function LoginPage(props: {
	searchParams: { callbackUrl: string | undefined }
}) {
	return <Login callbackUrl={props.searchParams?.callbackUrl} />;
}
