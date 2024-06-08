// Inicio Matemáticas

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
        <div className="flex flex-col md:flex-row items-center justify-center mt-5 mb-5">
          <div className="flex flex-col items-center mb-20 md:mb-0">
            <img src="/img/niveles/mate/donkeysaludo.png" alt="Donkey" className="h-64 w-auto mx-2.5 md:mr-8 md:ml-2.5" />
          </div>
          <p className="text-black super text-4xl md:text-6xl">MATEMÁTICA</p>
        </div>
        <SeparadorRosa />
      </section>

      {/*Gusano */}
      <section>
        <div className="flex justify-center overflow-x-auto mt-10">
          <div className="flex items-center mt-[-30px] md:mt-[-50px] lg:mt-[-80px]">
            <img 
              src="/img/niveles/mate/cabeza.png" 
              alt="cabeza" 
              className="worm-segment w-40 h-auto mt-4 lg:w-60 md:mr-2.5 animate-gusano" 
            />
          </div>
          <Link href="/niveles/nivel1/mate/operaciones_basicas">
            <img 
              src="/img/niveles/mate/ob.png" 
              alt="Operaciones básicas" 
              className="worm-segment flex-auto w-40 h-auto mt-8 mb-4 lg:w-60 md:mr-2.5 animate-gusano" 
            />
          </Link>
          <Link href="/nivel1/mate/nudeyfra">
            <img 
              src="/img/niveles/mate/NDYF.png" 
              alt="Números decimales" 
              className="worm-segment flex-auto w-40 h-auto mb-4 lg:w-60 md:mr-2.5 animate-gusano" 
            />
          </Link>
          <Link href="/nivel1/mate/geo">
            <img 
              src="/img/niveles/mate/geo.png" 
              alt="Geometría" 
              className="worm-segment flex-auto w-40 h-auto mb-4 mt-8 lg:w-60 md:mr-2.5 animate-gusano" 
            />
          </Link>
          <Link href="/nivel1/mate/resodepro">
            <img 
              src="/img/niveles/mate/rdp.png" 
              alt="Resolución de problemas" 
              className="worm-segment flex-auto w-40 h-auto mb-4 md:w-50 lg:w-60 animate-gusano" 
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
