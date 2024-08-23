// Página principal -Matemáticas - Nivel 1 - Números Decimales y Fracciones

"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { SessionContext } from '@/context/session'; 
import GuestModal from '@/components/modals/guestModal'; 
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul } from "@/components/separador";

export default function MatematicaPage() {
  /*
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
        
        <div className="mt-6 ml-10 inline-block"> Volver
          <Link href="/niveles/nivel1/mate">
            <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>

        <GuestModal show={showModal} onClose={handleCloseModal} />

      </>
    );
  }
  */

  return (
    <main>
      {/* Bienvenida del personaje */}
      <section>
        <SeparadorAzul />
        <div className="bg-purple-200 py-8">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel1/mate">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <img src="/img/niveles/mate/estrellita.png" alt="Animated Image" className="h-40 md:h-64 w-auto mb-4 md:mb-0 md:mr-4" />
              <p className="text-black super text-lg md:text-2xl max-w-lg">
              ¡Aventúrate en el intrigante universo de los decimales y las fracciones! Selecciona tu tema y déjate llevar por el encanto de los números y el aprendizaje divertido.
              </p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Introduccion */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Introducción a los números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Los números decimales son una forma de representar números que no son enteros. Se utilizan para mostrar partes de un todo, como, por ejemplo, 0.5 (que representa la mitad).
            </p>
            <Link href="/niveles/nivel1/mate/decimales/intro">
              <button className="mt-6 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-300">¡Aprendamos juntos!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorRosa />
      </section>

      {/* Comparación */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Comparación de números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Comparar números decimales significa determinar cuál es mayor, menor o si son iguales. Esto es importante para entender mejor los valores y cantidades.
            </p>
            <Link href="/niveles/nivel1/mate/decimales/comparacion">
              <button className="mt-6 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-300">¡Vamos a comparar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorVerde />
      </section>

      {/* Suma y resta */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Suma y resta de números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Se realizará la suma y resta de números decimales, que consiste en alinear los números por el punto decimal y realizar la operación de derecha a izquierda, asegurando que el resultado mantenga el punto decimal correctamente colocado.
            </p>
            <Link href="/niveles/nivel1/mate/decimales/suma_resta">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-300">¡Operemos decimales!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorCeleste />
      </section>

      {/* Fraccions simple */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Fracciones simples</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Una fracción simple representa una parte de un todo y se compone de dos números: el numerador (parte superior) y el denominador (parte inferior).
            </p>
            <Link href="/niveles/nivel1/mate/decimales/fracciones_simples">
              <button className="mt-6 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-300">¡Exploremos fracciones!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N4.png" alt="División" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorAmarillo />
      </section>
    </main>
  );
}
