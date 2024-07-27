"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/mate/ob/leccionModal";

export default function SumaPage() {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-green-100 py-4">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel1/mate/operaciones_basicas">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/signomas.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">SUMA</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/*terminos*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Terminos de la suma</h2>
            <p className="mt-2 text-black text-center">Sumando, sumando y total</p>
          </div>
          <img src="/img/niveles/mate/terminossuma.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 1*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 1</h2>
            <p className="mt-2 text-black text-wrap">Primero debemos ubicar los sumandos uno debajo del otro, puedes imaginar líneas verticales que forman casillas. En la primera casilla de derecha a izquierda deben estar las unidades, en la segunda las decenas, en la tercera las centenas y así sucesivamente</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/suma/paso1suma.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 2*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 2</h2>
            <p className="mt-2 text-black text-wrap">Ahora sumamos los dígitos que están en una misma columna, empezamos por las unidades: 4 + 3 = 7. Ponemos este resultado en la casilla de las unidades de la respuesta, que estará ubicada bajo una línea horizontal.</p>

          </div>
          <img src="/img/niveles/mate/nivel1/ob/suma/paso2suma.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 3*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 3</h2>
            <p className="mt-2 text-black text-wrap">Seguimos con las decenas: 1 + 2 = 3. Ubicamos esta suma en el lugar de las decenas de la respuesta.</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/suma/paso3suma.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 4*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 4</h2>
            <p className="mt-2 text-black text-center">Finalmente operamos, poniendo ese número en la casilla reservada para las centenas de la respuesta final.</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/suma/paso4suma.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 5</h2>
            <p className="mt-2 text-black text-center">Obtenemos el resultado</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/suma/resulsuma.png" alt="Suma" className="h-32 w-auto ml-4" />
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
        subjectName="Suma"
        continueLink="/niveles/nivel1/mate/operaciones_basicas/suma/juegos"
      />
    </main>
  );
}

