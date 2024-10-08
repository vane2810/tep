// Página principal -Matemáticas - Nivel 2 - Geometría

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
      {/* Bienvenida de personaje */}
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

      {/* areas */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Área de figuras planas</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Aprender a calcular el área de rectángulos, triángulos y cuadrados utilizando fórmulas específicas, aplicándolas a problemas prácticos.
            </p>
            <Link href="/niveles/nivel2/mate/geometria/area">
              <button className="mt-4 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-300">¡Calculemos áreas!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N1.png" alt="Suma" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorRosa />
      </section>

      {/* poligonos */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Polígonos</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Estudiar y clasificar polígonos regulares e irregulares, comprendiendo sus propiedades y cómo se relacionan entre sí.
            </p>
            <Link href="/niveles/nivel2/mate/geometria/poligonos">
              <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-300">¡Clasifiquemos polígonos!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N2.png" alt="Resta" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorVerde />
      </section>

      {/* cuerpos geometricos */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Cuerpos geométricos</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Identificar y analizar las características de cuerpos tridimensionales como cubos, prismas y cilindros, explorando sus propiedades y aplicaciones.
            </p>
            <Link href="/niveles/nivel2/mate/geometria/cuerpos">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-300">¡Exploremos cuerpos geométricos!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N3.png" alt="Multiplicación" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorCeleste />
      </section>

      {/* transformaciones geometricas */}
      <section className="my-10 px-4">
        <div className="flex flex-col md:flex-row items-center text-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-semibold">Transformaciones geométricas</h2>
            <p className="mt-2 text-black text-sm md:text-base">
            Introducción a las traslaciones, rotaciones y reflexiones de figuras en el plano, entendiendo cómo estas transformaciones afectan su posición y orientación.
            </p>
            <Link href="/niveles/nivel2/mate/geometria/transformaciones">
              <button className="mt-4 px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-300">¡Transformemos figuras!</button>
            </Link>
          </div>
          <img src="/img/niveles/mate/N4.png" alt="División" className="h-20 md:h-32 w-auto ml-4" />
        </div>
        <SeparadorAmarillo />
      </section>
    </main>
  );
}
