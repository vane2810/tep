import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul } from "@/components/separador";

export default function MatematicaPage() {
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-purple-200 py-8">
          <div className="flex flex-col items-center justify-center mt-4 mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figuritamate1.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">"¡Explora el fascinante mundo de las operaciones básicas! Elige tu tema y sumérgete en números y diversión."</p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Suma */}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Suma</h2>
            <p className="mt-2 text-black">La suma es una operación aritmética fundamental que se utiliza para calcular el total al combinar dos o más cantidades. Representada por el símbolo "+", la suma toma números llamados sumandos y los agrega para producir un resultado llamado suma o total.</p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/suma">
              <button className="mt-4 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-300">¡Vamos a sumar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
        <SeparadorRosa />
      </section>

      {/* Resta */}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Resta</h2>
            <p className="mt-2 text-black">La resta es una operación matemática que se utiliza para determinar la diferencia entre dos números. Representada por el símbolo "-", la resta toma un número llamado minuendo y le sustrae otro número llamado sustraendo, resultando en un número denominado diferencia.</p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/resta">
              <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-300">¡Vamos a restar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="h-32 w-auto ml-4" />
        </div>
        <SeparadorVerde />
      </section>

      {/* Multiplicación */}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Multiplicación</h2>
            <p className="mt-2 text-black">La multiplicación es una operación matemática que se utiliza para calcular el producto de dos o más números. Representada por el símbolo "×" o "*", la multiplicación toma números llamados factores y los combina para producir un resultado llamado producto.</p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/multiplicacion">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-300">¡Vamos a multiplicar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="h-32 w-auto ml-4" />
        </div>
        <SeparadorCeleste />
      </section>

      {/* División */}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">División</h2>
            <p className="mt-2 text-black">La división es una operación matemática que se utiliza para determinar cuántas veces un número (llamado dividendo) puede ser dividido por otro número (llamado divisor). Representada por los símbolos "÷" o "/", la división calcula el cociente, que es el resultado de la operación.</p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/division">
              <button className="mt-4 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-300">¡Vamos a dividir!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N4.png" alt="División" className="h-32 w-auto ml-4" />
        </div>
        <SeparadorAmarillo />
      </section>
    </main>
  );
}

