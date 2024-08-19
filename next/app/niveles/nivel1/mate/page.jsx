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
        <div className="mt-6 ml-10 inline-block">
          <Link href="/niveles/nivel1">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mb-5">
          <div className="flex flex-col items-center md:mr-8 md:ml-2.5 mb-4 md:mb-0">
            <img src="/img/personajes/donkey/donkeysaludo.png" alt="Donkey" className="h-64 w-auto mx-2.5 md:mr-8 md:ml-2.5" />
          </div>
          <p className="text-black super text-4xl md:text-6xl md:ml-8">MATEMÁTICA</p>
        </div>
        <SeparadorRosa />
      </section>

      {/*Gusano */}
      <section>
        <div className="flex justify-center overflow-x-auto mt-10">
          {/* Cabeza */}
          <div className="flex items-center mt-[-30px] md:mt-[-50px] lg:mt-[-80px]">
            <img
              src="/img/niveles/mate/nivel1/cabeza.png"
              alt="cabeza"
              className="worm-segment w-40 h-auto mt-4 lg:w-60 md:mr-2.5 animate-gusano"
            />
          </div>
          {/* Operaciones básicas */}
          <Link href="/niveles/nivel1/mate/operaciones_basicas">
            <img
              src="/img/niveles/mate/nivel1/ob.png"
              alt="Operaciones básicas"
              className="worm-segment flex-auto w-40 h-auto mt-8 mb-4 lg:w-60 md:mr-2.5 animate-gusano"
            />
          </Link>
          {/* Decimales*/}
          <Link href="/niveles/nivel1/mate/decimales">
            <img
              src="/img/niveles/mate/nivel1/NDYF.png"
              alt="Números decimales"
              className="worm-segment flex-auto w-40 h-auto mb-4 lg:w-60 md:mr-2.5 animate-gusano"
            />
          </Link>
          {/* Geometría*/}
          <Link href="/niveles/nivel1/mate/geometria">
            <img
              src="/img/niveles/mate/nivel1/geo.png"
              alt="Geometría"
              className="worm-segment flex-auto w-40 h-auto mb-4 mt-8 lg:w-60 md:mr-2.5 animate-gusano"
            />
          </Link>
          {/* Resolución de problemas (juegos finales) */}
          <Link href="/nivel1/mate/resodepro">
            <img
              src="/img/niveles/mate/nivel1/rdp.png"
              alt="Resolución de problemas"
              className="worm-segment flex-auto w-40 h-auto mb-4 md:w-50 lg:w-60 animate-gusano"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
