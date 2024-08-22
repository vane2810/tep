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
              <img src="/img/niveles/mate/figangu.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">ÁNGULOS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es un ángulo?</h2>
          <p className="mt-2 text-black text-center">Un ángulo se forma cuando dos líneas se encuentran en un punto llamado vértice. Piensa en las manos de un reloj: cuando señalan las 3:00, forman un ángulo en el centro del reloj. Los ángulos nos ayudan a entender cómo se abren o se cierran las cosas.</p>
          <img src="/img/niveles/mate/paso1angu.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Tipos de angulos:</h2>
          <h2 className="text-xl font-semibold text-center">Ángulo agudo</h2>
          <p className="mt-2 text-black text-center">Qué es: Un ángulo agudo es un ángulo que es pequeño y mide menos de 90°. Importancia: Los ángulos agudos se ven en las esquinas puntiagudas de muchas formas y objetos. Ejemplo: Piensa en un trozo de pizza. El ángulo en la punta del trozo es un ángulo agudo porque es estrecho.</p>
          <img src="/img/niveles/mate/paso2angu.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Ángulo recto</h2>
          <h2 className="text-xl font-semibold text-center">Un ángulo recto es un ángulo que mide exactamente 90°. Es como la esquina de un cuadrado o un rectángulo.</h2>
          <p className="mt-2 text-black text-center">Importancia: Los ángulos rectos son muy comunes y útiles para construir cosas rectas, como edificios y muebles. Ejemplo: La esquina de una hoja de papel es un ángulo recto. Es un ángulo perfecto, ni muy grande ni muy pequeño.</p>
          <img src="/img/niveles/mate/paso3angu.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Ángulo obtuso</h2>
          <h2 className="text-xl font-semibold text-center">Un ángulo obtuso es un ángulo que es grande y mide más de 90° pero menos de 180°.</h2>
          <p className="mt-2 text-black text-center">Importancia: Los ángulos obtusos se ven en las aperturas amplias, como en las puertas cuando están abiertas de par en par. Ejemplo: Si abres un libro solo un poquito, el ángulo entre las páginas es obtuso, porque es más ancho que un ángulo recto.</p>
          <img src="/img/niveles/mate/paso4angu.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Ángulo llano</h2>
          <h2 className="text-xl font-semibold text-center">Un ángulo llano es un ángulo que mide exactamente 180°. Se forma cuando las dos líneas que crean el ángulo están completamente en línea recta, una frente a la otra.</h2>
          <p className="mt-2 text-black text-center">Importancia: Los ángulos llanos son importantes porque representan una línea recta, como el horizonte, o la superficie plana de una mesa. Ejemplo: Imagina una línea recta que va de izquierda a derecha, sin doblarse. Ese es un ángulo llano.</p>
          <img src="/img/niveles/mate/paso5angu.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 6 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Cómo Medir un Ángulo?</h2>
          <p className="mt-2 text-black text-center">Para medir un ángulo, usamos una herramienta llamada transportador. Es como un semicírculo con números que te dicen cuántos grados tiene el ángulo. Colocas el centro del transportador en el vértice del ángulo y lees el número donde se encuentran las líneas del ángulo. Los ángulos se miden en grados (°). Cuantos más grados tiene un ángulo, más "abierto" está. Si giras en un círculo completo, habrás girado 360°, así que sabemos que 360° es todo un círculo.</p>
          <img src="/img/niveles/mate/paso6angu.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Angulos"
        continueLink="/niveles/nivel1/mate/geometria/angulos/juegos"
      />
    </main>
  );
}