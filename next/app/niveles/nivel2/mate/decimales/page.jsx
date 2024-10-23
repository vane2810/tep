// Página principal Números Decimales y Fracciones - Nivel 2

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
          <Link href="/niveles/nivel2/mate">
            <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>

        <GuestModal show={showModal} onClose={handleCloseModal} />

      </>
    );
  }

  return (
    <main>
      {/* Bienvenida de personaje*/}
      <section>
        <SeparadorAzul />
        <div className="bg-purple-200 py-8">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel2/mate">
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

      {/* Conversion */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Conversión entre fracciones y números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Es importante aprender a convertir entre fracciones y números decimales porque estas formas de representar números son comunes en matemáticas y en la vida cotidiana. Saber cómo convertir entre ellas facilita la comprensión y resolución de problemas en diferentes contextos, como medir ingredientes en una receta o calcular porcentajes.
            </p>
            <Link href="/niveles/nivel2/mate/decimales/conversion">
              <button className="mt-4 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-300">¡Convirtamos números!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorRosa />
      </section>

      {/* Multiplicacion */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Multiplicación de números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            La multiplicación de números decimales es una habilidad esencial en matemáticas y en la vida diaria. Nos permite realizar cálculos precisos en situaciones como calcular el costo total de varios artículos, encontrar áreas de figuras geométricas y realizar operaciones financieras.
            </p>
            <Link href="/niveles/nivel2/mate/decimales/multiplicacion">
              <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-300">¡Multipliquemos decimales!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorVerde />
      </section>

      {/* Division */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">División de números decimales</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Dividir números decimales es crucial para manejar cantidades y resolver problemas que involucran divisiones precisas. Es útil en contextos como repartir dinero, medir ingredientes o calcular proporciones en recetas.
            </p>
            <Link href="/niveles/nivel2/mate/decimales/division">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-300">¡Dividamos decimales!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorCeleste />
      </section>

      {/* Equivalentes */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Fracciones equivalentes</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Entender y trabajar con fracciones equivalentes es fundamental para simplificar fracciones y resolver problemas matemáticos de manera más eficiente. También ayuda a comprender mejor las relaciones entre diferentes fracciones.
            </p>
            <Link href="/niveles/nivel2/mate/decimales/equivalentes">
              <button className="mt-4 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-300">¡Identifiquemos fracciones!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N4.png" alt="División" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorAmarillo />
      </section>
    </main>
  );
}
