// Inicio del Nivel 1 (botones de materias)
import React from "react";
import Link from 'next/link';

export default function Nivel1() {
  return (
    <main>
      {/* Volver */}
      <div className="mt-6 ml-10 inline-block">
        <Link href="/">
          <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
        </Link>
      </div>

      {/* Botones*/}
      <div className="flex justify-center items-center mb-10">
        <Link href="/niveles/nivel1/mate">
          <img src="/img/personajes/donkey/donkeyboton.png" alt="Matematica" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel1/lenguaje">
          <img src="/img/personajes/principe/principeboton.png" alt="Lenguaje" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel1/ingles">
          <img src="/img/personajes/griffit/griffitboton.png" alt="Ingles" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
        <Link href="/niveles/nivel1/sociales">
          <img src="/img/personajes/burbuja/burbujaboton.png" alt="Sociales" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </Link>
      </div>
      <div className="flex justify-center items-center my-10">
        <Link
          href="/games/lvl1/intro"
          className=" w-40 h-20 md:w-50 lg:w-60 bg-purple-500 text-white text-center font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-purple-700"
        >Juego Introductorio</Link>
      </div>

    </main>
  );
}
