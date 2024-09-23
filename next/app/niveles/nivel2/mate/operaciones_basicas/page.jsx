// /pages/niveles/nivel2/matematicaPage.js
"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { SessionContext } from '@/context/session'; 
import GuestModal from '@/components/modals/guestModal'; 
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul } from "@/components/separador";

export default function MatematicaPage() {
  const { session } = useContext(SessionContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!session) {
      setShowModal(true);
    }
  }, [session]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!session) {
    return (
      <>
        
        <div className="inline-block mt-6 ml-10">
          <Link href="/niveles/nivel2/mate">
            <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        
        <GuestModal show={showModal} onClose={handleCloseModal} />
        
        <div className="mt-10 text-center">Volver</div>
      </>
    );
  }

  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-purple-200 py-4">
          {/* Botón de Volver */}
          <div className="inline-block mt-6 ml-10">
            <Link href="/niveles/nivel2/mate">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center mb-5 text-center">
            <div className="flex md:flex-row flex-col justify-center items-center">
              <img src="/img/niveles/mate/figuritamate1.png" alt="Animated Image" className="md:mr-4 mb-4 md:mb-0 w-auto h-40 md:h-64" />
              <p className="max-w-lg text-black text-lg md:text-2xl super">
                ¡Explora el fascinante mundo de las operaciones básicas! Elige tu tema y sumérgete en números y diversión.
              </p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Suma */}
      <section className="my-10 px-4">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">Suma</h2>
            <p className="mt-2 text-black text-sm md:text-base">
              La suma es una operación aritmética fundamental que se utiliza para calcular el total al combinar dos o más cantidades. Representada por el símbolo "+", la suma toma números llamados sumandos y los agrega para producir un resultado llamado suma o total.
            </p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/suma">
              <button className="bg-pink-500 hover:bg-pink-300 mt-4 px-4 py-2 rounded text-black">¡Vamos a sumar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorRosa />
      </section>

      {/* Resta */}
      <section className="my-10 px-4">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">Resta</h2>
            <p className="mt-2 text-black text-sm md:text-base">
              La resta es una operación matemática que se utiliza para determinar la diferencia entre dos números. Representada por el símbolo "-", la resta toma un número llamado minuendo y le sustrae otro número llamado sustraendo, resultando en un número denominado diferencia.
            </p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/resta">
              <button className="bg-green-500 hover:bg-green-300 mt-4 px-4 py-2 rounded text-black">¡Vamos a restar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorVerde />
      </section>

      {/* Multiplicación */}
      <section className="my-10 px-4">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">Multiplicación</h2>
            <p className="mt-2 text-black text-sm md:text-base">
              La multiplicación es una operación matemática que se utiliza para calcular el producto de dos o más números. Representada por el símbolo "×" o "*", la multiplicación toma números llamados factores y los combina para producir un resultado llamado producto.
            </p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/multiplicacion">
              <button className="bg-blue-500 hover:bg-blue-300 mt-4 px-4 py-2 rounded text-black">¡Vamos a multiplicar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorCeleste />
      </section>

      {/* División */}
      <section className="my-10 px-4">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">División</h2>
            <p className="mt-2 text-black text-sm md:text-base">
              La división es una operación matemática que se utiliza para determinar cuántas veces un número (llamado dividendo) puede ser dividido por otro número (llamado divisor). Representada por los símbolos "÷" o "/", la división calcula el cociente, que es el resultado de la operación.
            </p>
            <Link href="/niveles/nivel2/mate/operaciones_basicas/division">
              <button className="bg-orange-500 hover:bg-orange-300 mt-4 px-4 py-2 rounded text-black">¡Vamos a dividir!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N4.png" alt="División" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorAmarillo />
      </section>
    </main>
  );
}
