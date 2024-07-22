"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/mate/ob/leccionModal";
import sumaContent from "@/contenidos/nivel1/mate/operaciones_basicas/suma/sumaContent";

export default function SumaPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { title, sections } = sumaContent;

  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-green-100 py-4">
          {/* Volver */}
          <div className="mt-2 ml-10 inline-block">
            <Link href="/niveles/nivel1/mate/operaciones_basicas">
              <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/signomas.png" alt="Suma" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">{title}</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* Contenido de Suma */}
      {sections.map((section, index) => (
        <section key={index} className="my-10 px-4">
          <div className="flex items-center">
            <div className="flex-1 text-center">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-2 text-black text-wrap">{section.text}</p>
            </div>
            <img src={section.image} alt={section.title} className="h-32 w-auto ml-4" />
          </div>
        </section>
      ))}

      {/* Botón para abrir el modal */}
      <div className="flex justify-end">
        <button onClick={() => setModalOpen(true)} className="verde hover:bg-blue-300 text-white font-bold py-2 px-4 mb-8 mr-10 rounded">
          Siguiente
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        subjectName="Suma"
        continueLink="/niveles/nivel1/mate/operaciones_basicas/suma/juegos"
      />
    </main>
  );
}
