// Página de contenido de Equivalentes de decimales - Nivel 2
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
            <Link href="/niveles/nivel2/mate/decimales">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figfrasim.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">FRACCIONES EQUIVALENTES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es una fracción?</h2>
          <p className="mt-2 text-black text-center">Una fracción es una forma de mostrar partes de un todo. Por ejemplo, 1/2 significa una mitad de algo, como una rebanada de pizza.</p>
          <img src="/img/niveles/mate/paso1equivalentes.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué son las fracciones equivalentes?</h2>
          <p className="mt-2 text-black text-center">Las fracciones equivalentes son diferentes fracciones que representan la misma cantidad. Aunque se ven diferentes, tienen el mismo valor. Por ejemplo, 1/2 y 2/4 son fracciones equivalentes porque ambas representan la mitad de un todo.</p>
          <img src="/img/niveles/mate/paso2equivalentes.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cómo identificar fracciones equivalentes: Método de multiplicación</h2>
          <p className="mt-2 text-black text-center">Para encontrar una fracción equivalente, multiplica tanto el numerador (el número de arriba) como el denominador (el número de abajo) por el mismo número. Ejemplo: Multiplica 1/2 por 2/2. Esto te da 2/4, que es equivalente a 1/2.</p>
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cómo crear fracciones equivalentes: Método de división</h2>
          <p className="mt-2 text-black text-center">Puedes crear fracciones equivalentes dividiendo el numerador y el denominador por el mismo número (si ambos son divisibles por ese número). Ejemplo: 4/8 puede simplificarse dividiendo ambos por 4, lo que te da 1/2, que es equivalente a 4/8.</p>
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Visualización de fracciones equivalentes</h2>
          <p className="mt-2 text-black text-center">Para entenderlo mejor, imagina que tienes una pizza dividida en 2 partes iguales. Si cortas esas 2 partes por la mitad, ahora tienes 4 partes, pero todavía es la misma pizza. Así, 1/2 (una parte de dos) es lo mismo que 2/4 (dos partes de cuatro).</p>
        </div>
      </section>

      {/* paso 6 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Verificación de fracciones equivalentes</h2>
          <p className="mt-2 text-black text-center">Para comprobar si dos fracciones son equivalentes, multiplica cruzado. Multiplica el numerador de la primera fracción por el denominador de la segunda, y el numerador de la segunda por el denominador de la primera. Si los resultados son iguales, entonces las fracciones son equivalentes. Ejemplo: En 1/2 y 2/4, 1 × 4 = 4 y 2 × 2 = 4, así que son equivalentes.</p>
          <img src="/img/niveles/mate/paso6equivalentes.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Fracciones equivalentes"
        continueLink="/niveles/nivel2/mate/decimales/equivalentes/juegos"
      />
    </main>
  );
}