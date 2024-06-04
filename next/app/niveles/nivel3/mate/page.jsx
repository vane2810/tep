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
      {/* Botones */}
      <section>
        <div className="flex justify-between gap-x-1 mt-5 mx-2.5">
          <Link href="/niveles/nivel2/mate/operaciones_basicas">
            <img src="/img/niveles/mate/opebasicas.png" alt="Opebacs" className="w-65 h-64" />
          </Link>
          <Link href="/nivel1/mate/nudeyfra">
            <img src="/img/niveles/mate/Numerosdyf.png" alt="Numdecyfra" className="w-65 h-64" />
          </Link>
          <Link href="/nivel1/mate/geo">
            <img src="/img/niveles/mate/geometri.png" alt="Geog" className="w-65 h-64" />
          </Link>
          <Link href="/nivel1/mate/resodepro">
            <img src="/img/niveles/mate/resoluciondp.png" alt="Resodepro" className="w-65 h-64" />
          </Link>
        </div>
      </section>
      
    </main>
  );
}
