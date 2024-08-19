// Página de contenido de decimales en la vida cotidiana- Nivel 3
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
              <p className="text-black super text-[40px] max-w-lg">CONVERSIÓN ENTRE FRACCIONES Y DECIMALES</p>
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
          <h2 className="text-2xl font-semibold text-center">¿Qué es un número decimal?</h2>
          <p className="mt-2 text-black text-center">Un número decimal también representa partes de un todo, pero se escribe con un punto decimal. Por ejemplo, 0.5 es lo mismo que 1/2.</p>
          <img src="/img/niveles/mate/paso2companum.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Convertir una fracción a decimal: Paso 1</h2>
          <p className="mt-2 text-black text-center">Para convertir una fracción a un decimal, divide el número de arriba (numerador) entre el número de abajo (denominador). Ejemplo: 1/4 → 1 ÷ 4 = 0.25.</p>
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Convertir una fracción a decimal: Paso 2</h2>
          <p className="mt-2 text-black text-center">Escribe el resultado de la división como un número decimal. Así, 1/4 se convierte en 0.25.</p>
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Convertir un decimal a fracción: Paso 1</h2>
          <p className="mt-2 text-black text-center">La simetría ayuda a ver el equilibrio y la armonía en las formas que nos rodean. Es útil en el arte, la naturaleza, y hace que las cosas se vean bonitas y organizadas.</p>
        </div>
      </section>

     {/* paso 6 */}
     <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Simplificar la fracción</h2>
          <p className="mt-2 text-black text-center">Simplifica la fracción dividiendo el numerador y el denominador por su máximo común divisor. Ejemplo: 75/100 se simplifica a 3/4.</p>
          <img src="/img/niveles/mate/paso5sime.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Conversión entre fracciones y números decimales"
        continueLink="/niveles/nivel3/mate/decimales/operaciones/juegos"
      />
    </main>
  );
}