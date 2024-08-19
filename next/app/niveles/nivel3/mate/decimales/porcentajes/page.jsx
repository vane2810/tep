// Página de contenido PORCENTAJES Y SU RELACIÓN CON DECIMALES Y FRACCIONES- Nivel 3
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function EquivalentePage() {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <main>
      {/* Bienvenida de personaje */}
      <section>
        <SeparadorAzul />
        <div className="bg-green-100 py-4">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel3/mate/decimales">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figsumres.jpg" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">PORCENTAJES Y SU RELACIÓN CON DECIMALES Y FRACCIOONES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es un porcentaje?</h2>
          <p className="mt-2 text-black text-center">Un porcentaje es una forma de expresar una parte de un todo, como una fracción. Cuando decimos "porcentaje," nos referimos a cuántas partes hay de cada 100. Por ejemplo, 50% significa 50 partes de cada 100, o la mitad de algo.</p>
          <img src="/img/niveles/mate/paso1porcen.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Porcentajes y decimales</h2>
          <p className="mt-2 text-black text-center">Para convertir un porcentaje a un decimal, simplemente divides el número por 100 o mueves la coma dos veces a la izquierda. Por ejemplo, 25% se convierte en 0.25</p>
          <img src="/img/niveles/mate/paso2porcen.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Porcentajes y fracciones</h2>
          <p className="mt-2 text-black text-center">Para convertir un porcentaje a una fracción, escribes el porcentaje sobre 100 y luego lo simplificas si es posible.</p>
          <img src="/img/niveles/mate/paso3porcen.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cálculo de porcentajes</h2>
          <p className="mt-2 text-black text-center">Si quieres encontrar un porcentaje de un número, conviertes el porcentaje a un decimal y lo multiplicas.</p>
          <img src="/img/niveles/mate/paso4porcen.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

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
        subjectName="Porcentajes y su relación con decimales y fracciones"
        continueLink="/niveles/nivel3/mate/decimales/porcentajes/juegos"
      />
    </main>
  );
}