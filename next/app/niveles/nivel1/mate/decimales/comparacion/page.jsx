// página de contenido de comparación de números decimales
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function ComparacionPage() {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <main>
      {/* Bienvenida de personaje*/}
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
              <p className="text-black super text-[40px] max-w-lg">COMPARACIÓN DE NÚMEROS DECIMALES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 1</h2>
          <h2 className="text-xl font-semibold text-center">Entendiendo la comparación:</h2>
          <p className="mt-2 text-black text-center">Comparar números decimales significa determinar cuál es mayor, menor o si son iguales. Esto es importante para entender mejor los valores y cantidades y tomar decisiones informadas.</p>
          <img src="/img/niveles/mate/paso1compa.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 2</h2>
          <h2 className="text-xl font-semibold text-center">Comparación de las partes enteras:</h2>
          <p className="mt-2 text-black text-center">Primero, comparamos las partes enteras de los números decimales. Por ejemplo, al comparar 3.45 y 2.89, observamos que 3 es mayor que 2, por lo tanto, 3.45 es mayor que 2.89.</p>
          <img src="/img/niveles/mate/paso2compa.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 3</h2>
          <h2 className="text-xl font-semibold text-center">Comparación de las partes decimales:</h2>
          <p className="mt-2 text-black text-center">Si las partes enteras son iguales, comparamos las partes decimales. Por ejemplo, al comparar 4.56 y 4.78, como las partes enteras (4) son iguales, miramos el primer decimal. 7 es mayor que 5, por lo que 4.78 es mayor que 4.56.</p>
          <img src="/img/niveles/mate/paso3compa.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 4</h2>
          <h2 className="text-xl font-semibold text-center">Comparación decimal a decimal:</h2>
          <p className="mt-2 text-black text-center">Si el primer decimal es igual, comparamos el siguiente decimal. Por ejemplo, al comparar 5.342 y 5.348, comparamos decimal a decimal hasta encontrar una diferencia. Aquí, el tercer decimal (2 en 5.342 y 8 en 5.348) nos dice que 5.348 es mayor.</p>
          <img src="/img/niveles/mate/paso4compa.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Paso 5</h2>
          <h2 className="text-xl font-semibold text-center">Práctica de Comparación</h2>
          <p className="mt-2 text-black text-center">Ahora es tu turno. Practica comparando estos números decimales: 7.89 y 7.098, 3.56 y 3.560. Recuerda comparar primero las partes enteras y luego decimal a decimal. ¡Sigue practicando para dominar la comparación de números decimales!</p>
          <img src="/img/niveles/mate/paso5compa.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Comparación de numeros decimales"
        continueLink="/niveles/nivel1/mate/decimales/comparacion/juegos"
      />
    </main>
  );
}
