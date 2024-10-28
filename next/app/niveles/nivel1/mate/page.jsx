// Inicio Matemáticas - Nivel 1

import React from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";
import '@/styles/globals.css';
import '@/styles/animacion.css';

export default function MatematicaPage() {

  return (
    <main>
      {/* Bienvenida de Donkey*/}
      <section>
        <SeparadorRosa />
        {/* Volver */}
        <div className="inline-block mt-6 ml-10">
          <Link href="/niveles/nivel1">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center mb-5">
          <div className="flex flex-col items-center md:mr-8 mb-4 md:mb-0 md:ml-2.5">
            <img src="/img/personajes/donkey/donkey.png" alt="Donkey" className="mx-2.5 md:mr-8 md:ml-2.5 w-auto h-64" />
          </div>
          <p className="md:ml-8 text-4xl text-black md:text-6xl super">MATEMÁTICA</p>
        </div>
      </section>

      {/*Gusano */}
      <section>
        <div className="flex justify-center mt-10 overflow-x-auto">
          {/* Cabeza */}
          <div className="flex items-center mt-[-30px] md:mt-[-50px] lg:mt-[-80px]">
            <img
              src="/img/niveles/mate/nivel1/cabeza.png"
              alt="cabeza"
              className="worm-segment mt-4 md:mr-2.5 w-40 lg:w-60 h-auto animate-gusano"
            />
          </div>
          {/* Operaciones básicas */}
          <Link href="/niveles/nivel1/mate/operaciones_basicas">
            <img
              src="/img/niveles/mate/nivel1/ob.png"
              alt="Operaciones básicas"
              className="flex-auto worm-segment mt-8 md:mr-2.5 mb-4 w-40 lg:w-60 h-auto animate-gusano"
            />
          </Link>
          {/* Decimales*/}
          <Link href="/niveles/nivel1/mate/decimales">
            <img
              src="/img/niveles/mate/nivel1/NDYF.png"
              alt="Números decimales"
              className="flex-auto worm-segment md:mr-2.5 mb-4 w-40 lg:w-60 h-auto animate-gusano"
            />
          </Link>
          {/* Geometría*/}
          <Link href="/niveles/nivel1/mate/geometria">
            <img
              src="/img/niveles/mate/nivel1/geo.png"
              alt="Geometría"
              className="flex-auto worm-segment mt-8 md:mr-2.5 mb-4 w-40 lg:w-60 h-auto animate-gusano"
            />
          </Link>
          {/* Resolución de problemas (juegos finales) */}
          <Link href="/niveles/nivel1/mate/multimedia">
            <img
              src="/img/niveles/mate/nivel1/refuerzof.png"
              alt="Resolución de problemas"
              className="flex-auto worm-segment mb-4 w-40 md:w-50 lg:w-60 h-auto animate-gusano"
            />
          </Link>
        </div>
      </section>
      
      <SeparadorRosa />
    </main>
    
  );
}
