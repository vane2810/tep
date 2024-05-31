// Inicio Matemáticas

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
          <div className="flex flex-col items-center mb-20"> 
            <Link href="/niveles/nivel1">
              <img src="/img/page/regresa.png" alt="Volver" className="w-12 h-auto" />
            </Link>
          </div>
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
          <Link href="/niveles/nivel1/mate/operaciones_basicas">
            <img src="/img/niveles/mate/ob.png" alt="Operaciones básicas" className="flex-auto w-64 h-auto" />
          </Link>
          <Link href="/nivel1/mate/nudeyfra">
            <img src="/img/niveles/mate/NDYF.png" alt="Números decimales" className="flex-auto w-64 h-auto" />
          </Link>
          <Link href="/nivel1/mate/geo">
            <img src="/img/niveles/mate/geo.png" alt="Geometria" className="flex-auto w-64 h-auto" />
          </Link>
          <Link href="/nivel1/mate/resodepro">
            <img src="/img/niveles/mate/rdp.png" alt="Resolución de problemas" className="flex-auto w-64 h-auto" />
          </Link>
        </div>
      </section>
      
    </main>
  );
}
