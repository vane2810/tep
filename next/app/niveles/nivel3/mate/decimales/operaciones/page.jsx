// Página de contenido de operaciones básicas de fracciones - Nivel 3
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function OperacionesPage() {

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
              <img src="/img/niveles/mate/introfig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">OPERACIONES CON FRACCIONES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es una fracción?</h2>
          <p className="mt-2 text-black text-center">Una fracción representa una parte de un todo. Por ejemplo, 1/2 significa que tienes una mitad de algo.</p>
          <img src="/img/niveles/mate/paso1companum.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Suma de fracciones</h2>
          <p className="mt-2 text-black text-center">Fracciones con el mismo denominador: Para sumar fracciones que tienen el mismo denominador, solo sumas los numeradores y mantienes el denominador igual.</p>
          <img src="/img/niveles/mate/paso2.0sumfra.png" alt="Suma" className="h-32 w-auto mt-4" />
          <p className="mt-2 text-black text-center">Fracciones con diferentes denominadores: Primero, hay que encontrar un denominador común (el número en el que ambos denominadores pueden convertirse). Luego, ajustas los numeradores y sumas.</p>
          <img src="/img/niveles/mate/paso2.1sumfra.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Resta de fracciones</h2>
          <p className="mt-2 text-black text-center">Fracciones con el mismo denominador: Para restar fracciones con el mismo denominador, simplemente restas los numeradores y mantienes el denominador.</p>
          <img src="/img/niveles/mate/paso3.0opera.png" alt="Suma" className="h-32 w-auto mt-4" />
          <p className="mt-2 text-black text-center">Fracciones con diferentes denominadores: Igual que con la suma, necesitas un denominador común antes de restar.</p>
          <img src="/img/niveles/mate/paso3.1opera.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Multiplicación de fracciones</h2>
          <p className="mt-2 text-black text-center">Multiplicar fracciones es simple: solo multiplicas los numeradores entre sí y los denominadores entre sí.</p>
          <img src="/img/niveles/mate/paso4opera.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">División de fracciones</h2>
          <p className="mt-2 text-black text-center">Para dividir fracciones, sigues un truco especial: multiplicas la primera fracción por el inverso de la segunda fracción. El inverso es lo que obtienes al voltear la fracción (intercambiar el numerador y el denominador).</p>
          <img src="/img/niveles/mate/paso5opera.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

     {/* paso 6 */}
     <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia de las operaciones con fracciones</h2>
          <p className="mt-2 text-black text-center">Saber cómo trabajar con fracciones es muy útil en la vida diaria. Por ejemplo, cuando compartes pizza con amigos, estás usando fracciones para dividir la comida. Si tienes que medir ingredientes para una receta, las fracciones te dicen cuánta cantidad necesitas. Entender cómo sumar, restar, multiplicar y dividir fracciones te ayuda a resolver problemas y hacer cálculos con partes de un todo.</p>
          <img src="/img/niveles/mate/paso6opera.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Operaciones con fracciones"
        continueLink="/niveles/nivel3/mate/decimales/operaciones/juegos"
      />
    </main>
  );
}