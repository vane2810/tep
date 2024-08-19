"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/mate/ob/leccionModal";

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
              <img src="/img/niveles/mate/figfrasim.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">FRACCIONES SIMPLES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 1</h2>
          <h2 className="text-xl font-semibold text-center">¿Qué es una fracción?</h2>
          <p className="mt-2 text-black text-center">Una fracción representa una parte de un todo. Se compone de dos números: el numerador (arriba) y el denominador (abajo). Por ejemplo, en la fracción 1/4, el "1" es el numerador y el "4" es el denominador.</p>
          <img src="/img/niveles/mate/paso1frasim.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 2</h2>
          <h2 className="text-xl font-semibold text-center">Entendiendo el numerador y el denominador:</h2>
          <p className="mt-2 text-black text-center">El numerador indica cuántas partes estamos considerando, mientras que el denominador nos dice en cuántas partes iguales se ha dividido el todo. En 1/4, el "4" nos dice que el todo se ha dividido en 4 partes iguales, y el "1" nos dice que estamos considerando una de esas partes.</p>
          <img src="/img/niveles/mate/paso2frasim.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 3</h2>
          <h2 className="text-xl font-semibold text-center">Representación gráfica de las fracciones:</h2>
          <p className="mt-2 text-black text-center">Podemos representar gráficamente una fracción usando diagramas, como un círculo o un rectángulo dividido en partes iguales. Por ejemplo, para representar 1/2, podemos dibujar un círculo y dividirlo en 2 partes iguales, y luego sombrear una de ellas.</p>
          <img src="/img/niveles/mate/paso3frasim.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 4</h2>
          <h2 className="text-xl font-semibold text-center">Comparando fracciones:</h2>
          <p className="mt-2 text-black text-center">Al comparar fracciones con el mismo denominador, podemos ver cuál es mayor o menor observando los numeradores. Por ejemplo, 3/4 es mayor que 1/4 porque 3 partes de un todo son más que 1 parte.</p>
          <img src="/img/niveles/mate/paso4frasim.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 5</h2>
          <h2 className="text-xl font-semibold text-center">Práctica de representación gráfica:</h2>
          <p className="mt-2 text-black text-center">Ahora es tu turno. Practica dibujando y sombreando fracciones como 2/3 o 3/5. Esto te ayudará a visualizar mejor cómo se dividen y representan las fracciones. ¡Sigue practicando para dominar el concepto de fracciones simples!</p>
          <img src="/img/niveles/mate/paso5frasim.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Fracciones simples"
        continueLink="/niveles/nivel1/mate/decimales/fracciones_simples/juegos"
      />
    </main>
  );
}