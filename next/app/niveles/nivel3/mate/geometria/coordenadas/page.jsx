// Página de contenido de AREA Y PERIMETRO DE CUERPOS - Nivel 3
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
              <img src="/img/niveles/mate/figangu.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">COORDENADAS EN EL PLANO</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es un plano?</h2>
          <p className="mt-2 text-black text-center">Un plano es como una hoja de papel donde puedes dibujar puntos, líneas y formas. Es una superficie plana que se extiende en todas las direcciones.</p>
          <img src="/img/niveles/mate/paso1plano.png" alt="Suma" className="h-50 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué son las coordenadas cartesianas?</h2>
          <p className="mt-2 text-black text-center">Las coordenadas cartesianas son un par de números que nos dicen dónde está un punto en el plano. Estos números se llaman "coordenada X" (para la dirección horizontal) y "coordenada Y" (para la dirección vertical).</p>
          <img src="/img/niveles/mate/paso2plano.png" alt="Suma" className="h-50 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cómo ubicar un punto en el plano</h2>
          <p className="mt-2 text-black text-center">Para ubicar un punto en el plano, primero te mueves a lo largo del eje X (horizontal) según el primer número, y luego hacia arriba o hacia abajo en el eje Y (vertical) según el segundo número. Así encuentras el lugar exacto del punto.</p>
          <img src="/img/niveles/mate/paso3plano.png" alt="Suma" className="h-50 w-auto mt-4" />
        </div>
      </section>

    
      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia de las Coordenadas</h2>
          <p className="mt-2 text-black text-center">Las coordenadas nos ayudan a describir la posición exacta de algo en un espacio, como en un mapa o en un videojuego, y son una herramienta básica para ubicarse en el mundo.</p>
          <img src="/img/niveles/mate/paso4plano.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Coordenadas en el plano"
        continueLink="/niveles/nivel3/mate/geometria/coordenadas/juegos"
      />
    </main>
  );
}