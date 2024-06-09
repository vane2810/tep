import React from "react";
import Link from "next/link";
import { SeparadorVerde } from "@/components/separador";
import '@/styles/globals.css';

export default function PageGameSuma() {
  return (
    <main className="container mx-auto">
      {/* Volver */}
      <div className="mt-2 ml-10 inline-block">
        <Link href="/niveles/nivel1/mate/operaciones_basicas/suma">
          <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
        </Link>
      </div>
      {/* Donkey */}
      <section className="flex flex-col items-center justify-center ">
        <h2 className="text-2xl md:text-4xl font-bold mt-4 story">¡Bienvenido a los Juegos de Suma!</h2>
        <img src="/img/personajes/donkey.png" alt="Donkey" className="h-40 md:h-64 mt-6" />
      </section>
      <SeparadorVerde />

      {/* Lista de juegos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-8 py-8">
        <Link href="/games/lvl1/mate/suma/game3"
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
          items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste">
          Juego 1
        </Link>


        {/* Juego 2 */}
        <Link href="/games/lvl1/mate/suma/game2"
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
         items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste">Juego 2
        </Link>

        {/* Juego 3 */}
        <Link href="/games/lvl1/mate/suma/game1"
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
         items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste">Juego 3
        </Link>

        {/* Juego 4 */}
        <Link href="/games/lvl1/mate/suma/game4"
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
         items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste">Juego 4
        </Link>
      </section>
    </main>
  );
}
