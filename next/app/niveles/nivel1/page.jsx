import React from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";

export default function Nivel1() {
  return (
    <main>
      <SeparadorRosa/>
      <div className="flex justify-center items-center mt-10">
        <Link href="/niveles/nivel1/mate">
          <img src="/img/niveles/mate/matematica.png" alt="Matematica" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel1/lenguaje">
          <img src="/img/niveles/lenguaje/lenguaje.png" alt="Lenguaje" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel1/ingles">
          <img src="/img/niveles/ingles/ingles.png" alt="Ingles" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel1/sociales">
          <img src="/img/niveles/sociales/sociales.png" alt="Sociales" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
      </div>
    </main>
  );
}
