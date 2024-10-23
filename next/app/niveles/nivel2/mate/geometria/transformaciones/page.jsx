// Página de contenido de Transformaciones geométricas- Nivel 2
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function TransPage() {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <main>
      {/* Bienvenida de personaje */}
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
              <img src="/img/niveles/mate/figsime.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">TRANSFORMACIONES GEOMÉTRICAS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es una transformación geométrica?</h2>
          <p className="mt-2 text-black text-center">Una transformación geométrica es un cambio que hacemos a una figura en el plano, como moverla de un lugar a otro, girarla o reflejarla como en un espejo. A pesar de estos cambios, la figura sigue siendo la misma, solo que en una posición diferente. Los tres tipos principales de transformaciones son traslaciones, rotaciones y reflexiones.</p>
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Traslación: Mover una Figura</h2>
          <p className="mt-2 text-black text-center">¿Qué es? Una traslación es cuando movemos una figura de un lugar a otro sin girarla ni cambiar su tamaño. Es como deslizar la figura en línea recta por el plano.</p>
          <p className="mt-2 text-black text-center">Ejemplo: Imagina que tienes un triángulo dibujado en una hoja. Si lo deslizas hacia la derecha sin cambiar su forma o tamaño, eso es una traslación. Cada punto del triángulo se mueve la misma distancia en la misma dirección.</p>
          <img src="/img/niveles/mate/paso2trans.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Rotación: Girar una Figura</h2>
          <p className="mt-2 text-black text-center">¿Qué es? Una rotación es cuando giramos una figura alrededor de un punto fijo. La figura se mantiene igual, pero su orientación cambia.</p>
          <p className="mt-2 text-black text-center">Ejemplo: Imagina que giras un reloj. La forma del reloj no cambia, pero la dirección en la que apuntan las agujas sí lo hace. Si giras un cuadrado 90 grados hacia la derecha, los lados del cuadrado estarán en diferentes posiciones, pero el cuadrado seguirá siendo un cuadrado.</p>
          <img src="/img/niveles/mate/paso3trans.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Reflexión: Reflejar una Figura</h2>
          <p className="mt-2 text-black text-center">¿Qué es? Una reflexión es como mirar una figura en un espejo. La figura se refleja a través de una línea, llamada eje de simetría, y se forma una imagen espejo.</p>
          <p className="mt-2 text-black text-center">Ejemplo: Si dibujas una estrella y la reflejas a través de una línea vertical, la estrella parecerá volteada como si la estuvieras viendo en un espejo. La forma y el tamaño de la estrella no cambian, pero su orientación sí.</p>
          <img src="/img/niveles/mate/paso4trans.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Propiedades de las transformaciones</h2>
          <p className="mt-2 text-black text-center">Todas estas transformaciones tienen algo en común: no cambian el tamaño ni la forma de la figura, solo su posición o su orientación. Esto significa que, después de una traslación, rotación o reflexión, la figura sigue siendo congruente (igual) a la original.</p>
        </div>
      </section>

      {/* paso 6 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia de las transformaciones geométricas</h2>
          <p className="mt-2 text-black text-center">Las transformaciones geométricas son muy útiles para entender cómo cambian las cosas sin cambiar lo que son. Por ejemplo, cuando juegas con bloques y los mueves de un lado a otro (traslación), cuando giras un juguete para verlo desde otro ángulo (rotación), o cuando ves tu reflejo en un espejo (reflexión). Estos movimientos te ayudan a imaginar cómo se ven las cosas desde diferentes perspectivas.</p>
          <img src="/img/niveles/mate/paso6trans.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Transformaciones geométricas"
        continueLink="/niveles/nivel2/mate/geometria/transformaciones/juegos"
      />
    </main>
  );
}