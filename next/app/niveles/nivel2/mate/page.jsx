import React from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";

export default function MatematicaPage() {
  return (
    <main>
      {/* Bienvenida de Donkey*/}
      <section>
        <SeparadorRosa />
        <div className="flex items-center justify-center mt-5 mb-5">
          <img src="/img/niveles/mate/donkeysaludo.png" alt="Animated Image" className="h-64 w-auto mr-[360px] ml-2.5" />
          <p className="text-black super text-[76px]">MATEMÁTICA</p>
        </div>
        <SeparadorRosa />
      </section>

      {/* Gusano*/}
      <section>
        <div className="flex justify-center gap-x-2.5 mt-5">
          <div className="flex-auto w-50 h-auto">
            <img src="/img/niveles/mate/cabeza.png" alt="cabeza" className="w-80 h-70" />
          </div>
          <Link href="/niveles/nivel2/mate/operaciones_basicas">
            <img src="/img/niveles/mate/ob.png" alt="Opebacs" className="flex-auto w-64 h-auto" />
          </Link>
          <Link href="/nivel2/mate/nudeyfra">
            <img src="/img/niveles/mate/NDYF.png" alt="Numdeyfra" className="flex-auto w-64 h-auto" />
          </Link>
          <Link href="/nivel2/mate/geo">
            <img src="/img/niveles/mate/geo.png" alt="Geog" className="flex-auto w-64 h-auto" />
          </Link>
          <Link href="/nivel2/mate/resodepro">
            <img src="/img/niveles/mate/rdp.png" alt="Resodepro" className="flex-auto w-64 h-auto" />
          </Link>
        </div>
      </section>
      
    </main>
  );
}