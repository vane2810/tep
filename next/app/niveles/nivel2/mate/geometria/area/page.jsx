// Página de contenido de areas - Nivel 2
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

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
            <Link href="/niveles/nivel2/mate/geometria">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figfig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">ÁREA DE FIGURAS PLANAS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es el área?</h2>
          <p className="mt-2 text-black text-center">El área es la cantidad de espacio dentro de una figura plana. Es como si quisieras saber cuántos cuadritos caben dentro de un rectángulo, triángulo o cuadrado. La medimos en unidades cuadradas, como centímetros cuadrados (cm²).</p>
          <img src="/img/niveles/mate/paso1area.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cálculo del área de un rectángulo</h2>
          <h2 className="text-xl font-semibold text-center">Para calcular el área de un rectángulo, necesitas conocer su largo (la medida de un lado largo) y su ancho (la medida de un lado corto). La fórmula es: AREA DEL RECTANGULO = LARGO x ANCHO.</h2>
          <p className="mt-2 text-black text-center">Ejemplo: Si un rectángulo tiene un largo de 8 cm y un ancho de 4 cm, su área es: 8 × 4 = 32cm2. Esto significa que hay 32 cuadritos de 1 cm² dentro del rectángulo. Esto significa que hay 32 cuadritos de 1 cm² dentro del rectángulo.</p>
          <img src="/img/niveles/mate/paso4figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cálculo del área de un cuadrado</h2>
          <h2 className="text-xl font-semibold text-center">Un cuadrado es un tipo especial de rectángulo donde todos los lados son iguales. Para calcular su área, solo necesitas un lado (lo llamamos lado en lugar de largo o ancho). La fórmula es: AREA DE UN CUADRADO= LADO x LADO. </h2>
          <p className="mt-2 text-black text-center">Ejemplo: Si cada lado del cuadrado mide 5 cm, su área es: 5 x 5 = 25cm2. Esto significa que hay 25 cuadritos de 1 cm² dentro del cuadrado.</p>
          <img src="/img/niveles/mate/paso3figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cálculo del área de un triángulo</h2>
          <h2 className="text-xl font-semibold text-center">Para calcular el área de un triángulo, necesitas conocer su base (el lado sobre el que se apoya) y su altura (la distancia desde la base hasta el punto más alto). La fórmula es: BASE x ALTURA ÷ 2.</h2>
          <p className="mt-2 text-black text-center">Ejemplo: Si un triángulo tiene una base de 6 cm y una altura de 4 cm, su área es: 6 x 4 = 24 ÷ 2 = 12cm2. Esto significa que hay 12 cuadritos de 1 cm² dentro del triángulo.</p>
          <img src="/img/niveles/mate/paso2figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Aplicando las fórmulas</h2>
          <p className="mt-2 text-black text-center">Las fórmulas son herramientas que usamos para calcular rápidamente el área. Puedes pensar en ellas como recetas que siempre te darán la respuesta correcta si sigues los pasos. Para cualquier figura plana como un rectángulo, cuadrado o triángulo, solo necesitas las medidas correctas, y la fórmula te dirá cuántas unidades cuadradas caben dentro.</p>
          <img src="/img/niveles/mate/paso5area.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 6 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia del cálculo del área</h2>
          <p className="mt-2 text-black text-center">Saber cómo calcular el área es muy útil en la vida diaria. Por ejemplo, si quieres saber cuánta alfombra necesitas para cubrir el suelo de una habitación (un rectángulo), o cuánta pintura necesitas para un cuadro (un cuadrado), o cuánta tierra necesitas para llenar un jardín en forma de triángulo.</p>
          <img src="/img/niveles/mate/paso6area.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Área de figuras planas"
        continueLink="/niveles/nivel2/mate/geometria/area/juegos"
      />
    </main>
  );
}