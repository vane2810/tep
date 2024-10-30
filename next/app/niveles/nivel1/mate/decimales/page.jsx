// Página principal -Matemáticas - Nivel 1 - Números Decimales y Fracciones

"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { SessionContext } from '@/context/session'; 
import GuestModal from '@/components/modals/guestModal'; 
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul } from "@/components/separador";

export default function MatematicaPage() {
  const { session } = useContext(SessionContext);
  const [showModal, setShowModal] = useState(false);

 
  /*  useEffect(() => {
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
        
        <div className="inline-block mt-6 ml-10"> Volver
          <Link href="/niveles/nivel1/mate">
            <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>

        <GuestModal show={showModal} onClose={handleCloseModal} />

      </>
    );
  }*/

  return (
    <main>
      {/* Bienvenida del personaje */}
      <section>
        <SeparadorAzul />
        <div className="bg-purple-200 py-8">
          {/* Volver */}
          <div className="inline-block mt-6 ml-10">
            <Link href="/niveles/nivel1/mate">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center mb-5 text-center">
            <div className="flex md:flex-row flex-col justify-center items-center">
              <img src="/img/niveles/mate/estrellita.png" alt="Animated Image" className="md:mr-4 mb-4 md:mb-0 w-auto h-40 md:h-64" />
              <p className="max-w-lg text-black text-lg md:text-2xl super">
              ¡Aventúrate en el intrigante universo de los decimales y las fracciones! Selecciona tu tema y déjate llevar por el encanto de los números y el aprendizaje divertido.
              </p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Introduccion */}
      <section className="my-10 px-4 letters">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">Introducción a los números decimales</h2>
            <p className="mt-2 text-2xl">
            Los números decimales son una forma de representar números que no son enteros. Se utilizan para mostrar partes de un todo, como, por ejemplo, 0.5 (que representa la mitad).
            </p>
            <Link href="/niveles/nivel1/mate/decimales/intro">
              <button className="bg-pink-500 hover:bg-pink-300 mt-6 px-4 py-2 rounded text-black">¡Aprendamos juntos!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorRosa />
      </section>

      {/* Comparación */}
      <section className="my-10 px-4">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">Comparación de números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Comparar números decimales significa determinar cuál es mayor, menor o si son iguales. Esto es importante para entender mejor los valores y cantidades.
            </p>
            <Link href="/niveles/nivel1/mate/decimales/comparacion">
              <button className="bg-green-500 hover:bg-green-300 mt-6 px-4 py-2 rounded text-black">¡Vamos a comparar!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorVerde />
      </section>

      {/* Suma y resta */}
      <section className="my-10 px-4 letters">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">Suma y resta de números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Se realizará la suma y resta de números decimales, que consiste en alinear los números por el punto decimal y realizar la operación de derecha a izquierda, asegurando que el resultado mantenga el punto decimal correctamente colocado.
            </p>
            <Link href="/niveles/nivel1/mate/decimales/suma_resta">
              <button className="bg-blue-500 hover:bg-blue-300 mt-4 px-4 py-2 rounded text-black">¡Operemos decimales!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorCeleste />
      </section>

      {/* Fraccions simple */}
      <section className="my-10 px-4">
        <div className="flex md:flex-row flex-col items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="font-semibold text-xl md:text-2xl">Fracciones simples</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Una fracción simple representa una parte de un todo y se compone de dos números: el numerador (parte superior) y el denominador (parte inferior).
            </p>
            <Link href="/niveles/nivel1/mate/decimales/fracciones_simples">
              <button className="bg-orange-500 hover:bg-orange-300 mt-6 px-4 py-2 rounded text-black">¡Exploremos fracciones!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N4.png" alt="División" className="ml-4 w-auto h-20 md:h-32" />
        </div>
        <SeparadorAmarillo />
      </section>
    </main>
  );
}
