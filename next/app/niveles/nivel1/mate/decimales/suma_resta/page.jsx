// Página de contenido de Suma y resta de decimales - Nivel 1
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

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
            <Link href="/niveles/nivel1/mate/decimales">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figsumres.jpg" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">SUMA Y RESTA DE NUMEROS DECIMALES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 1</h2>
          <h2 className="text-xl font-semibold text-center">Alineación de los números decimales:</h2>
          <p className="mt-2 text-black text-center">Para sumar o restar números decimales, el primer paso es alinear los números por el punto decimal. Esto asegura que estemos sumando o restando las partes correctas del número (las unidades con las unidades, las décimas con las décimas, etc.).</p>
          <img src="/img/niveles/mate/paso1sumres.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 2</h2>
          <h2 className="text-xl font-semibold text-center">Completar con ceros si es necesario:</h2>
          <p className="mt-2 text-black text-center">Si los números tienen una cantidad diferente de dígitos después del punto decimal, puedes añadir ceros para que tengan la misma longitud. Esto no cambia el valor del número, pero facilita la operación. Por ejemplo, al sumar 3.4 y 2.35, podemos escribir 3.40 para que ambos tengan dos dígitos después del punto decimal.</p>
          <img src="/img/niveles/mate/paso2sumres.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 3</h2>
          <h2 className="text-xl font-semibold text-center">Suma de números decimales:</h2>
          <p className="mt-2 text-black text-center">Para sumar, comenzamos desde el extremo derecho (el dígito más a la derecha) y sumamos como si fueran números enteros, moviéndonos hacia la izquierda. Asegúrate de mantener el punto decimal en la misma posición en la respuesta.</p>
          <img src="/img/niveles/mate/paso3sumres.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 4</h2>
          <h2 className="text-xl font-semibold text-center">Resta de números decimales:</h2>
          <p className="mt-2 text-black text-center">Para la resta, también operamos de derecha a izquierda. Si el dígito superior es menor que el inferior, pedimos prestado de la columna anterior. Por ejemplo:</p>
          <img src="/img/niveles/mate/paso4sumres.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 5</h2>
          <h2 className="text-xl font-semibold text-center">Práctica de suma y resta de decimales</h2>
          <p className="mt-2 text-black text-center">Ahora es tu turno. Practica con estos ejemplos: 6.3 + 4.27 y 8.95 - 2.25. Alinea, suma o resta, y verifica tu respuesta. ¡La práctica constante te ayudará a dominar la suma y resta de números decimales!</p>
          <img src="/img/niveles/mate/paso5sumres.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Suma y resta de decimales"
        continueLink="/niveles/nivel1/mate/decimales/suma_resta/juegos"
      />
    </main>
  );
}
