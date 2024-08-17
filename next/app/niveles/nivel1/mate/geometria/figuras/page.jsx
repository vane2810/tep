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
            <Link href="/niveles/nivel1/mate/decimales">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figfig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">FIGURAS GEOMETRICAS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué son las figuras geométricas?</h2>
          <p className="mt-2 text-black text-center">Las figuras geométricas son formas que podemos ver y tocar a nuestro alrededor. Son como los bloques básicos con los que podemos construir cosas en nuestra mente. Hoy vamos a aprender sobre algunas figuras geométricas planas, que son aquellas que tienen solo dos dimensiones: largo y ancho. ¡Imagina que son como dibujos en una hoja de papel!</p>
          <img src="/img/niveles/mate/paso1figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">El Triángulo</h2>
          <h2 className="text-xl font-semibold text-center">Un triángulo es una figura con tres lados y tres esquinas (que también se llaman vértices).</h2>
          <p className="mt-2 text-black text-center">Clasificación: Los triángulos pueden ser de diferentes tipos según sus lados:Equilátero: Todos sus lados son iguales, Isósceles: Tiene dos lados iguales y Escaleno: Todos sus lados son diferentes.</p>
          <img src="/img/niveles/mate/paso2figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">El Cuadrado</h2>
          <h2 className="text-xl font-semibold text-center">Un cuadrado es una figura con cuatro lados iguales y cuatro esquinas que son iguales entre sí.</h2>
          <p className="mt-2 text-black text-center">Clasificación: Todos los lados y ángulos de un cuadrado son iguales, lo que lo hace una figura muy especial. Es un tipo de rectángulo donde todos los lados son iguales.</p>
          <img src="/img/niveles/mate/paso3figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">El Rectángulo</h2>
          <h2 className="text-xl font-semibold text-center">Un rectángulo también tiene cuatro lados y cuatro esquinas. Sin embargo, a diferencia del cuadrado, los lados opuestos de un rectángulo son iguales entre sí, pero no todos los lados son iguales.</h2>
          <p className="mt-2 text-black text-center">Clasificación: Al igual que el cuadrado, todos los ángulos de un rectángulo son iguales. Un rectángulo tiene lados largos y cortos, pero los opuestos son iguales.</p>
          <img src="/img/niveles/mate/paso4figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">El Círculo</h2>
          <h2 className="text-xl font-semibold text-center">Un círculo es una figura completamente redonda. No tiene lados ni esquinas, pero tiene un centro, y todos los puntos en el borde del círculo están a la misma distancia de ese centro.</h2>
          <p className="mt-2 text-black text-center">Clasificación: Los círculos no tienen lados o esquinas, pero podemos medir su radio (la distancia desde el centro hasta el borde) o su diámetro (la distancia de un lado al otro, pasando por el centro).</p>
          <img src="/img/niveles/mate/paso5figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Figuras geometricas"
        continueLink="/niveles/nivel1/mate/geometria/figuras/juegos"
      />
    </main>
  );
}