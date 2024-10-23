// Mate - Nivel 3
import React from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";

export default function MatematicaPage() {
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorRosa />
        {/* Volver */}
        <div className="mt-6 ml-10 inline-block">
          <Link href="/niveles/nivel3">
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

      {/* Temas */}
      <section className="my-20">
        <div className="flex flex-wrap justify-center gap-4 mt-5 mx-2.5">
          <Link href="/niveles/nivel3/mate/operaciones_basicas">
            <img src="/img/niveles/mate/nivel3/opebasicas.png" alt="Operaciones" className="w-36 md:w-64 h-36 md:h-64 md:mr-3" />
          </Link>
          <Link href="/niveles/nivel3/mate/decimales">
            <img src="/img/niveles/mate/nivel3/Numerosdyf.png" alt="Numeros decimales" className="w-36 md:w-64 h-36 md:h-64 md:mr-3" />
          </Link>
          <Link href="/niveles/nivel3/mate/geometria">
            <img src="/img/niveles/mate/nivel3/geometri.png" alt="Geografia" className="w-36 md:w-64 h-36 md:h-64 md:mr-3" />
          </Link>
          <Link href="/niveles/nivel3/mate/multimedia">
            <img src="/img/niveles/mate/nivel3/repaso.png" alt="Resolucion de problemas" className="w-36 md:w-64 h-36 md:h-64 md:mr-3" />
          </Link>
        </div>
      </section>

    </main>
  );
}
