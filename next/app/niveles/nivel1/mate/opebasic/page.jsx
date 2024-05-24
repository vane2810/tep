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

      {/*Suma*/}
      <section className="my-10 px-4">
        <h2 className="text-2xl font-semibold">Suma</h2>
        <p className="mt-2 text-black">Descripción del tema 1.</p>
        <Link href="ruta que me hace falta">
          <button className="mt-4 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-400">¡Vamos a sumar!</button>
        </Link>
        <SeparadorRosa />
      </section>

      {/*Resta*/}
      <section className="my-10 px-4">
        <h2 className="text-2xl font-semibold">Resta</h2>
        <p className="mt-2 text-black">Descripción del tema 2.</p>
        <Link href="ruta que me hace falta">
          <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400">¡Vamos a restar!</button>
        </Link>
        <SeparadorRosa />
      </section>

      {/*Multiplicación*/}
      <section className="my-10 px-4">
        <h2 className="text-2xl font-semibold">Multiplicación</h2>
        <p className="mt-2 text-black">Descripción del tema 3.</p>
        <Link href="ruta que me hace falta">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-300">¡Vamos a multiplicar!</button>
        </Link>
        <SeparadorRosa />
      </section>

      {/*División*/}
      <section className="my-10 px-4">
        <h2 className="text-2xl font-semibold">División</h2>
        <p className="mt-2 text-black">Descripción del tema 4.</p>
        <Link href="ruta que me hace falta">
          <button className="mt-4 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-300">¡Vamos a dividir!</button>
        </Link>
      </section>
    </main>
  );
}

