// Página de contenido de Multiplicacion de decimales - Nivel 2
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function MultiPage() {

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
              <img src="/img/niveles/mate/compafig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">MULTIPLICACIÓN DE NÚMEROS DECIMALES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Recordando la multiplicación</h2>
          <p className="mt-2 text-black text-center">La multiplicación es como sumar el mismo número varias veces. Por ejemplo, 3 × 2 es lo mismo que 2 + 2 + 2 = 6.</p>
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Multiplicación sin el punto decimal</h2>
          <p className="mt-2 text-black text-center">Primero, multiplica los números como si no tuvieran puntos decimales. Ejemplo: Multiplica 2.5 × 3.2 como si fueran 25 × 32.</p>
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Multiplica los números</h2>
          <p className="mt-2 text-black text-center">Haz la multiplicación normal. Ejemplo: 25 × 32 = 800.</p>
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Contando los lugares decimales</h2>
          <p className="mt-2 text-black text-center">Cuenta cuántos dígitos hay después del punto decimal en ambos números. Ejemplo: En 2.5 y 3.2, hay un dígito después del punto en cada número, así que en total hay 2 dígitos.</p>
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Colocando el punto decimal</h2>
          <p className="mt-2 text-black text-center">Pon el punto decimal en el resultado final, comenzando desde la derecha y moviéndolo hacia la izquierda el número de lugares que contaste antes. Ejemplo: En 800, mueve el punto 2 lugares hacia la izquierda: 8.00.</p>
        </div>
      </section>

{/* paso 6 */}
<section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Resultado final</h2>
          <p className="mt-2 text-black text-center">El resultado de 2.5 × 3.2 es 8.00, o simplemente 8.</p>
          <img src="/img/niveles/mate/paso6multinum.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Multiplicación de números decimales"
        continueLink="/niveles/nivel2/mate/decimales/multiplicacion/juegos"
      />
    </main>
  );
}