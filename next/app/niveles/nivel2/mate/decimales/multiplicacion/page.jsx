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
              <img src="/img/niveles/mate/figsime.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">SIMETRÍA</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es la simetría?</h2>
          <p className="mt-2 text-black text-center">La simetría es cuando una figura o un objeto se puede dividir en dos partes iguales que son exactamente iguales, como si fueran reflejos en un espejo.</p>
          <img src="/img/niveles/mate/paso1sime.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Simetría vertical</h2>
          <p className="mt-2 text-black text-center">Ocurre cuando puedes dibujar una línea de arriba hacia abajo en una figura, y las dos mitades a cada lado de la línea son iguales. Ejemplo: una mariposa.</p>
          <img src="/img/niveles/mate/paso2sime.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Simetría horizontal</h2>
          <p className="mt-2 text-black text-center">Ocurre cuando puedes dibujar una línea de lado a lado en una figura, y las dos mitades encima y debajo de la línea son iguales. Ejemplo: un lago que refleja las montañas.</p>
          <img src="/img/niveles/mate/paso3sime.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Simetría rotacional</h2>
          <p className="mt-2 text-black text-center">Ocurre cuando puedes girar una figura alrededor de un punto central, y en algún momento, la figura parece igual a como era antes de girarla. Ejemplo: una estrella de mar.</p>
          <img src="/img/niveles/mate/paso4sime.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia de la simetría</h2>
          <p className="mt-2 text-black text-center">La simetría ayuda a ver el equilibrio y la armonía en las formas que nos rodean. Es útil en el arte, la naturaleza, y hace que las cosas se vean bonitas y organizadas.</p>
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
        subjectName="Simetría"
        continueLink="/niveles/nivel1/mate/geometria/simetria/juegos"
      />
    </main>
  );
}