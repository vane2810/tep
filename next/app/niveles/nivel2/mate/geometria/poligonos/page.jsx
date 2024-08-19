// Página de contenido de Poligonos- Nivel 2
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function FraccionesPage() {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-green-100 py-4">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel1/mate/decimales">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/compafig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">POLIGONOS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es un polígono?</h2>
          <p className="mt-2 text-black text-center">Un polígono es una figura plana que tiene muchos lados rectos. Piensa en un polígono como una forma que está cerrada, como un triángulo, un cuadrado o un pentágono. Cada uno de esos lados se llama arista, y los puntos donde se encuentran los lados se llaman vértices.</p>
          <img src="/img/niveles/mate/figuritamate1.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Polígonos Regulares vs. Irregulares</h2>
          <p className="mt-2 text-black text-center">Polígonos Regulares: Tienen todos sus lados y ángulos iguales. Ejemplo: Un cuadrado es un polígono regular porque todos sus lados son iguales y todos sus ángulos miden lo mismo.</p>
          <p className="mt-2 text-black text-center">Polígonos Irregulares: Tienen lados y ángulos de diferentes longitudes y medidas. Ejemplo: Un rectángulo que no es un cuadrado es un polígono irregular porque sus lados no son todos iguales.</p>
          <img src="/img/niveles/mate/paso2poli.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Propiedades de los polígonos regulares</h2>
          <h2 className="text-xl font-semibold text-center">En los polígonos regulares:</h2>
          <p className="mt-2 text-black text-center">Todos los lados tienen la misma longitud.</p>
          <p className="mt-2 text-black text-center">Todos los ángulos interiores (los ángulos dentro del polígono) son iguales.</p>
          <p className="mt-2 text-black text-center">Ejemplos: Triángulo equilátero (3 lados), cuadrado (4 lados), pentágono regular (5 lados).</p>
          <img src="/img/niveles/mate/paso3poli.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Propiedades de los polígonos irregulares</h2>
          <h2 className="text-xl font-semibold text-center">En los polígonos irregulares:</h2>
          <p className="mt-2 text-black text-center">Los lados pueden tener longitudes diferentes.</p>
          <p className="mt-2 text-black text-center">Los ángulos interiores pueden ser de diferentes tamaños.</p>
          <p className="mt-2 text-black text-center">Ejemplos: Un triángulo escaleno (3 lados desiguales), un trapecio (4 lados, con solo un par de lados paralelos).</p>
          <img src="/img/niveles/mate/paso4poli.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cómo contar lados y vértices</h2>
          <h2 className="text-xl font-semibold text-center">Un polígono siempre tiene el mismo número de lados y vértices. </h2>
          <p className="mt-2 text-black text-center">Por ejemplo, un pentágono tiene 5 lados y 5 vértices. Cuantos más lados tenga un polígono, más vértices tendrá, y su forma será más compleja.</p>
        </div>
      </section>

      {/* Paso 6 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia de los polígonos</h2>
          <p className="mt-2 text-black text-center">Los polígonos son muy importantes porque están en todas partes, desde las señales de tráfico (como los octágonos) hasta las baldosas del suelo (muchas veces en forma de cuadrados o hexágonos). Entender las propiedades de los polígonos nos ayuda a comprender mejor el mundo que nos rodea y cómo se construyen muchas cosas.</p>
          <img src="/img/niveles/mate/paso6poli.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Poligonos"
        continueLink="/niveles/nivel2/mate/geometria/poligonos/juegos"
      />
    </main>
  );
}