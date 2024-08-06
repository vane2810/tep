// Página principal -Matemáticas - Nivel 1 - Geometría

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
      {/* Bienvenida de Donkey */}
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
              <img src="/img/niveles/mate/figuras.png" alt="Animated Image" className="h-40 md:h-64 w-auto mb-4 md:mb-0 md:mr-4" />
              <p className="text-black super text-lg md:text-2xl max-w-lg">
              Sumérgete en la increíble aventura de la geometría! Elige tu tema favorito y déjate sorprender por la magia de las formas, los ángulos y las figuras. Descubre cómo la geometría transforma tu visión del mundo y disfruta de un aprendizaje lleno de diversión y entusiasmo.
              </p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Suma */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Figuras geométricas</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Los estudiantes aprenderán a identificar y clasificar figuras planas como triángulos, cuadrados, rectángulos y círculos, entendiendo sus propiedades y relaciones.
            </p>
            <Link href="/niveles/nivel1/mate/geometria/figuras">
              <button className="mt-4 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-300">¡Identifiquemos figuras!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorRosa />
      </section>

      {/* Resta */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Perímetro</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Calcular el perímetro de figuras simples sumando la longitud de todos sus lados, aplicando este conocimiento a situaciones cotidianas.
            </p>
            <Link href="/niveles/nivel1/mate/geometria/perimetro">
              <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-300">¡Calculemos perímetros!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorVerde />
      </section>

      {/* Multiplicación */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Ángulos</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Introducción a los ángulos, sus tipos (agudos, rectos, obtusos) y cómo medirlos usando herramientas como el transportador.
            </p>
            <Link href="/niveles/nivel1/mate/geometria/angulos">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-300">¡Midamos ángulos!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorCeleste />
      </section>

      {/* División */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Simetría</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Comprender el concepto de simetría y aprender a reconocer y crear figuras simétricas en su entorno y mediante actividades prácticas.
            </p>
            <Link href="/niveles/nivel1/mate/geometria/simetria">
              <button className="mt-4 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-300">¡Descubramos simetrías!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N4.png" alt="División" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorAmarillo />
      </section>
    </main>
  );
}
