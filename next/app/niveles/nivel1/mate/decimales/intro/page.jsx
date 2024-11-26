// Página de contenido de la introduccion a decimales - Nivel 1
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function IntroPage() {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <main>
      {/* Bienvenida del personaje */}
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
              <img src="/img/niveles/mate/introfig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">INTRODUCCIÓN A LOS NÚMEROS DECIMALES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 1</h2>
          <h2 className="text-xl font-semibold text-center">Comprendiendo los números enteros:</h2>
          <p className="mt-2 text-black text-center">Primero, recordemos los números enteros que ya conocemos. Los números enteros son aquellos sin partes fraccionarias, como 1, 2, 3, etc. Son números completos sin decimales.</p>
          <img src="/img/niveles/mate/paso1intro.jpg" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 2</h2>
          <h2 className="text-xl font-semibold text-center">Conociendo las fracciones:</h2>
          <p className="mt-2 text-black text-center">Ahora, imagina que tienes una pizza y la cortas en dos partes iguales. Si te comes una de esas partes, has comido la mitad de la pizza. Esto se representa con la fracción 1/2.</p>
          <img src="/img/niveles/mate/paso2intro.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 3</h2>
          <h2 className="text-xl font-semibold text-center">Relación entre fracciones y decimales</h2>
          <p className="mt-2 text-black text-center">La fracción 9/10 también se puede escribir como un número decimal. En lugar de 9/10, podemos escribir 0.9. El punto (.) se llama 'punto decimal', y nos indica que hay una parte del número que es menor que 1.</p>
          <img src="/img/niveles/mate/paso3intro.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 4</h2>
          <h2 className="text-xl font-semibold text-center">Entendiendo el punto decimal</h2>
          <p className="mt-2 text-black text-center">El punto decimal separa la parte entera del número de la parte decimal. Por ejemplo, en el número 2.3, el '2' es la parte entera y el '3' después del punto decimal es la parte fraccionaria.</p>
          <img src="/img/niveles/mate/paso4intro.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 5</h2>
          <h2 className="text-xl font-semibold text-center">Practica con números decimales</h2>
          <p className="mt-2 text-black text-center">Ahora es tu turno. Practica convirtiendo algunas fracciones en decimales. Por ejemplo, ¿cómo escribiríamos 1/5 como decimal? La respuesta es 0.2. ¡Sigue practicando para dominar los números decimales!</p>
          <img src="/img/niveles/mate/paso5intro.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Introducción a los números decimales"
        continueLink="/niveles/nivel1/mate/decimales/intro/juegos"
      />
    </main>
  );
}
