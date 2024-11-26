// Página de contenido de TEOREMA DE PITAGORAS - Nivel 3
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
            <Link href="/niveles/nivel3/mate/geometria">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figfig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">TEOREMA DE PITÁGORAS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es un triángulo rectángulo?</h2>
          <p className="mt-2 text-black text-center">Un triángulo rectángulo es un triángulo que tiene un ángulo de 90 grados, que se llama ángulo recto. Este tipo de triángulo tiene dos lados más cortos, llamados catetos, y un lado más largo, que es la hipotenusa.</p>
          <img src="/img/niveles/mate/paso1pita.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué dice el teorema de pitágoras?</h2>
          <p className="mt-2 text-black text-center">El Teorema de Pitágoras nos ayuda a entender la relación entre los lados de un triángulo rectángulo. Dice que si conocemos las longitudes de los dos lados cortos (los catetos), podemos encontrar la longitud del lado más largo (la hipotenusa).</p>
          <img src="/img/niveles/mate/paso2pita.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cómo usar el teorema de pitágoras</h2>
          <p className="mt-2 text-black text-center">Si sabes cuánto miden dos lados de un triángulo rectángulo, puedes usar este teorema para averiguar cuánto mide el tercer lado. Esto es muy útil cuando necesitas conocer la distancia más corta entre dos puntos o asegurarte de que algo está bien alineado.</p>
          <img src="/img/niveles/mate/paso3pita.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia del teorema de pitágoras</h2>
          <p className="mt-2 text-black text-center">El Teorema de Pitágoras se usa en muchas situaciones prácticas, como en la construcción o en la navegación, para asegurarse de que todo está en su lugar correcto o para encontrar distancias de manera precisa.</p>
          <img src="/img/niveles/mate/paso4pita.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Teorema de pitágoras"
        continueLink="/niveles/nivel3/mate/geometria/pitagoras/juegos"
      />
    </main>
  );
}