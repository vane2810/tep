// Inicio Nivel 3

import React from "react";
import Link from 'next/link';

export default function Nivel3() {
  return (
    <main>
      <div className="flex justify-center items-center mt-10">
        <Link href="/niveles/nivel3/mate">
          <img src="/img/niveles/mate/matematica.png" alt="Matematica" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel3/lenguaje">
          <img src="/img/niveles/lenguaje/lenguaje.png" alt="Sociales" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel3/ingles">
          <img src="/img/niveles/ingles/ingles.png" alt="Lenguaje" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel3/sociales">
          <img src="/img/niveles/sociales/sociales.png" alt="Ingles" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
      </div>
    </main>
  );
}
