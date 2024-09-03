// Inicio Nivel 2
import React from "react";
import Link from 'next/link';
import Volver from '@/components/botonVolver'
import { SeparadorAnaranjado, SeparadorRojo } from "@/components/separador";

export default function Nivel2() {
  return (
    <main>
      <SeparadorRojo />
      <section>
        {/* Volver */}
        <Volver href="/" title="Volver a la página principal" />
        <div className="mt-6 ml-10 flex justify-center items-center">
          <img src="/img/personajes/niveles/marten2.png" alt="Nivel 2" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
        </div>
        
          

      </section>

      <SeparadorRojo />
      <section>
        {/* Botones*/}
        <div className="flex justify-center items-center mb-10">
          <Link href="/niveles/nivel2/mate">
            <img src="/img/personajes/donkey/donkeyboton.png" alt="Matematica" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
          </Link>
          <Link href="/niveles/nivel2/lenguaje">
            <img src="/img/personajes/principe/principeboton.png" alt="Lenguaje" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
          </Link>
          <Link href="/niveles/nivel2/ingles">
            <img src="/img/personajes/griffit/griffitboton.png" alt="Ingles" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
          </Link>
          <Link href="/niveles/nivel2/sociales">
            <img src="/img/personajes/burbuja/burbujaboton.png" alt="Sociales" className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-2" />
          </Link>
        </div>
      </section>

      <div className="flex justify-center items-center my-10">
        <Link
          href="/games/lvl2/intro"
          className=" w-40 h-20 md:w-50 lg:w-60 bg-purple-500 text-white text-center font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-purple-700"
        >Juego Introductorio</Link>
      </div>
    </main>
  );
}
