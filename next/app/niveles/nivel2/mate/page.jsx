import React from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";
import '@/styles/animacion.css';

export default function MatematicaPage() {
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorRosa />
        {/* Volver */}
        <div className="mt-6 ml-10 inline-block">
          <Link href="/niveles/nivel2">
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

      {/* Botones */}
      <section className="my-20">
        <div className="flex flex-wrap justify-center gap-4 mt-5 mx-2.5">
          <Link href="/niveles/nivel2/mate/operaciones_basicas">
            <img src="/img/niveles/mate/nivel2/opebasic.png" alt="Operaciones" className="w-36 md:w-64 h-36 md:h-64 md:mr-3 animate-salto" />
          </Link>
          <Link href="/nivel1/mate/nudeyfra">
            <img src="/img/niveles/mate/nivel2/numdeciyfra.png" alt="Numeros decimales" className="w-36 md:w-64 h-36 md:h-64 md:mr-3 animate-salto" />
          </Link>
          <Link href="/nivel1/mate/geo">
            <img src="/img/niveles/mate/nivel2/geom.png" alt="Geogafia" className="w-36 md:w-64 h-36 md:h-64 md:mr-3 animate-salto" />
          </Link>
          <Link href="/nivel1/mate/resodepro">
            <img src="/img/niveles/mate/nivel2/resodp.png" alt="Resolucion de problemas" className="w-36 md:w-64 h-36 md:h-64 md:mr-3 animate-salto" />
          </Link>
        </div>
      </section>

    </main>
  );
}
