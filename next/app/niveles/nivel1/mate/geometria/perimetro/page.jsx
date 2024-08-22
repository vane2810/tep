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
            <Link href="/niveles/nivel1/mate/geometria">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/figperi.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">PERIMETRO</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es el Perímetro?</h2>
          <p className="mt-2 text-black text-center">El perímetro es la distancia total que rodea una figura. Imagina que tienes una cuerda y la colocas alrededor de una figura, siguiendo todos sus lados. La longitud total de esa cuerda sería el perímetro de la figura. ¡Es como caminar todo alrededor de un parque y querer saber cuántos pasos diste en total!</p>
          <img src="/img/niveles/mate/paso1figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Cómo Calculamos el Perímetro?</h2>
          <h2 className="text-xl font-semibold text-center">Para calcular el perímetro de una figura, simplemente sumamos la longitud de todos sus lados. Veamos cómo hacerlo con algunas figuras simples.</h2>
          <p className="mt-2 text-black text-center">Perímetro de un Triángulo. Cálculo: Suma las longitudes de los tres lados. Si un triángulo tiene lados de 3 cm, 4 cm y 5 cm, el perímetro se calcula así: Perímetro = 3 cm + 4 cm + 5 cm = 12 cm</p>
          <img src="/img/niveles/mate/paso2figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Perímetro de un Cuadrado</h2>
          <h2 className="text-xl font-semibold text-center">Cálculo: Como todos los lados son iguales, puedes multiplicar la longitud de un lado por 4. Si cada lado mide 2 cm, el perímetro se calcula así:</h2>
          <p className="mt-2 text-black text-center">Perímetro = 2 cm + 2 cm + 2 cm + 2 cm = 8 cm o simplemente Perímetro = 4 × 2 cm = 8 cm</p>
          <img src="/img/niveles/mate/paso3figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Perímetro de un Rectángulo</h2>
          <h2 className="text-xl font-semibold text-center">Cálculo: Suma la longitud de los cuatro lados. Si un rectángulo tiene lados largos de 6 cm y lados cortos de 3 cm, el perímetro se calcula así:</h2>
          <p className="mt-2 text-black text-center">Perímetro = 6 cm + 3 cm + 6 cm + 3 cm = 18 cm o Perímetro = 2 × (6 cm + 3 cm) = 18 cm</p>
          <img src="/img/niveles/mate/paso4figugeo.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Perímetro de un Círculo (Circunferencia)</h2>
          <h2 className="text-xl font-semibold text-center">Cálculo: El perímetro de un círculo se llama circunferencia y se calcula con una fórmula especial: Circunferencia = 2 × π × radio. Pero, por ahora, puedes pensar que es la distancia alrededor del círculo.</h2>
          <p className="mt-2 text-black text-center">Ejemplo: Si el radio de un círculo es 4 cm, su circunferencia es aproximadamente: Circunferencia ≈ 2 × 3.14 × 4 cm ≈ 25.12 cm</p>
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
        subjectName="Perimetro"
        continueLink="/niveles/nivel1/mate/geometria/perimetro/juegos"
      />
    </main>
  );
}