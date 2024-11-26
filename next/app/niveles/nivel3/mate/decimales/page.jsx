// Página principal -Matemáticas - Nivel 3 - Números Decimales y Fracciones

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
        
        <div className="mt-6 ml-10 inline-block"> Volver
          <Link href="/niveles/nivel1/mate">
            <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>

        <GuestModal show={showModal} onClose={handleCloseModal} />

      </>
    );
  }

  return (
    <main>
      {/* Bienvenida de personaje */}
      <section>
        <SeparadorAzul />
        <div className="bg-purple-200 py-8">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel3/mate">
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

      {/* Operaciones con fracciones */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Operaciones con fracciones</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Es crucial aprender a realizar operaciones con fracciones porque las fracciones se utilizan en muchas áreas de la matemática y en situaciones cotidianas. Saber sumar, restar, multiplicar y dividir fracciones ayuda a resolver problemas de manera precisa y efectiva.
            </p>
            <Link href="/niveles/nivel3/mate/decimales/operaciones">
              <button className="mt-4 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-300">¡Operemos con fracciones!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorRosa />
      </section>

      {/* Números decimales en la vida cotidiana*/}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Números decimales en la vida cotidiana</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Los números decimales se utilizan en muchas aplicaciones prácticas en la vida cotidiana, como manejar dinero, medir distancias y cantidades, y calcular precios y descuentos. Comprender cómo trabajar con decimales es esencial para la vida diaria.
            </p>
            <Link href="/niveles/nivel3/mate/decimales/aplicacion">
              <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-300">¡Usemos decimales!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorVerde />
      </section>

      {/* Porcentajes y su relación con decimales y fracciones*/}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Porcentajes y su relación con decimales y fracciones</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Los porcentajes son una forma común de representar partes de un todo y están estrechamente relacionados con decimales y fracciones. 
            </p>
            <Link href="/niveles/nivel3/mate/decimales/porcentajes">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-300">¡Entendamos porcentajes!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorCeleste />
      </section>
      
    </main>
  );
}
