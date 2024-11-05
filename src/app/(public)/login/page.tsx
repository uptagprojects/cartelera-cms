import { Metadata } from "next";
import React from "react";

import { Login } from "./components/Login";

export const metadata: Metadata = {
	title: "PNFi | Iniciar Sesion",
	description: "Programa Nacional de Formacion en Informatica"
};

export default function LoginPage() {
	return <Login />;
}
