// Página de inicio de lo juegos de area y perimetro / Nivel 3
"use client"
import React, { useState } from "react";
import Link from "next/link";
import { SeparadorVerde } from "@/components/separador";
import IntroModal from "@/components/modals/games/mate/introModal";
import '@/styles/globals.css';
import '@/styles/animacion.css';

export default function PageGame() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [continueLink, setContinueLink] = useState("");

  const openModal = (title, link) => {
    setModalTitle(title);
    setContinueLink(link);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <main className="container mx-auto">
      {/* Volver */}
      <div className="mt-2 ml-10 inline-block">
        <Link href="/niveles/nivel3/mate/geometria/area_perimetro">
          <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
        </Link>
      </div>
      {/* Donkey */}
      <section className="flex flex-col items-center justify-center mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mt-4 story">¡Bienvenido a los juegos del area y volumen de cuerpos!</h2>
        <img src="/img/niveles/mate/figperi.png" alt="Donkey" className="h-28 md:h-64 mt-6 animate-tumble" />
      </section>
      <SeparadorVerde />


      {/*JUEGOS*/}
      {/* Lista de juegos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-8 py-8">
        <div
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
          items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste"
          onClick={() => openModal("Juego 1", "/games/lvl3/mate/geometria/area_perimetro/game1")}
        >
          Juego 1
        </div>

        {/* Juego 2 */}
        <div
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
          items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste"
          onClick={() => openModal("Juego 2", "/games/lvl3/mate/geometria/area_perimetro/game2")}
        >
          Juego 2
        </div>

        {/* Juego 3 */}
        <div
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
          items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste"
          onClick={() => openModal("Juego 3", "/games/lvl3/mate/geometria/area_perimetro/game3")}
        >
          Juego 3
        </div>

        {/* Juego 4 */}
        <div
          className="border text-xl font-semibold story border-gray-300 rounded-lg p-8 flex flex-col 
          items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer celeste"
          onClick={() => openModal("Juego 4", "/games/lvl3/mate/geometria/area_perimetro/game4")}
        >
          Juego 4
        </div>
      </section>
      {/* Modal */}
      <IntroModal
        show={showModal}
        onClose={closeModal}
        title={modalTitle}
        continueLink={continueLink}
      />
    </main>
  );
}