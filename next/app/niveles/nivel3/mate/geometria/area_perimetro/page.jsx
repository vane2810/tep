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
              <img src="/img/niveles/mate/figperi.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">AREA Y VOLUMEN DE CUERPOS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué son las figuras tridimensionales?</h2>
          <p className="mt-2 text-black text-center">Primero, hay que entender qué es una figura tridimensional. A diferencia de las figuras planas (como cuadrados y círculos), las figuras tridimensionales tienen tres dimensiones: largo, ancho y alto. Ejemplos de figuras tridimensionales son las pirámides y las esferas.</p>
          <img src="/img/niveles/mate/paso1area.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Área de una Pirámide</h2>
          <p className="mt-2 text-black text-center">El área de una pirámide se refiere a la cantidad de superficie que cubre. Piensa en la pirámide como un objeto que puedes "envolver" con papel de regalo. Si pudieras aplanar todo el papel que cubre la pirámide, ese sería su área. El área incluye todas las caras triangulares de la pirámide.</p>
          <img src="/img/niveles/mate/paso2area.png" alt="Suma" className="h-50 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Volumen de una Pirámide</h2>
          <p className="mt-2 text-black text-center">El volumen de una pirámide nos dice cuánto espacio ocupa dentro. Imagina que llenas la pirámide con arena. Todo el espacio que la arena llena dentro de la pirámide es su volumen. Cuanto más alta o más ancha sea la pirámide, mayor será su volumen.</p>
          <img src="/img/niveles/mate/paso3area.png" alt="Suma" className="h-50 w-auto mt-4" />
        </div>
      </section>

    
      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia de entender Área y Volumen</h2>
          <p className="mt-2 text-black text-center">Saber cómo calcular el área y el volumen es útil en muchas situaciones prácticas, como al diseñar objetos, empaques, o entender cuánto espacio ocupará algo. Por ejemplo, saber el volumen de una caja te ayuda a saber cuántas cosas puedes guardar en ella.</p>
          <img src="/img/niveles/mate/paso4area.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Area y volumen de cuerpos"
        continueLink="/niveles/nivel3/mate/geometria/area_perimetro/juegos"
      />
    </main>
  );
}