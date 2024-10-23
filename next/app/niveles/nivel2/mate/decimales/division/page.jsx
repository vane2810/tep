// Página de contenido de Division de decimales - Nivel 2
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

export default function DivPage() {

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
              <img src="/img/niveles/mate/figsumres.jpg" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">DIVISIÓN DE NÚMEROS DECIMALES</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">¿Qué es la división?</h2>
          <p className="mt-2 text-black text-center">La división es como repartir algo en partes iguales. Por ejemplo, si tienes 10 galletas y las divides entre 2 amigos, cada uno recibe 5 galletas. La división nos ayuda a entender cómo compartir o distribuir cosas.</p>
          <img src="/img/niveles/mate/signodivision.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Preparar el problema de división</h2>
          <p className="mt-2 text-black text-center">Primero, coloca el número decimal que vas a dividir (el dividendo) dentro de la casita de división, y el número por el cual vas a dividir (el divisor) afuera. Ejemplo: 6.75 ÷ 1.5.</p>
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Eliminar los decimales del divisor</h2>
          <p className="mt-2 text-black text-center">Para hacer la división más fácil, multiplica tanto el divisor como el dividendo por 10, 100, o 1000 (según sea necesario) para eliminar el punto decimal del divisor. En el ejemplo, multiplica 6.75 y 1.5 por 10, convirtiéndolos en 67.5 ÷ 15.</p>
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Realiza la división como de costumbre</h2>
          <p className="mt-2 text-black text-center">Ahora, realiza la división normal. Divide 67.5 entre 15. Empieza dividiendo 67 entre 15, lo que da 4, porque 15 × 4 = 60. Resta 60 de 67 para obtener 7. Luego, baja el 5 (de 67.5) para hacer 75. Divide 75 entre 15, lo que da 5, porque 15 × 5 = 75. No hay nada que reste, así que terminas con 4.5.</p>
        </div>
      </section>

      {/* paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Ajustar el punto decimal</h2>
          <p className="mt-2 text-black text-center">Coloca el punto decimal en el cociente (el resultado) directamente sobre el punto decimal en el dividendo original. Como ya hemos movido los decimales en el divisor y el dividendo, no es necesario hacer más ajustes. El resultado final es 4.5.</p>
        </div>
      </section>

      {/* paso 6 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Comprobar el resultado</h2>
          <p className="mt-2 text-black text-center">Para asegurarte de que tu respuesta es correcta, puedes multiplicar el resultado (4.5) por el divisor original (1.5). Deberías obtener el dividendo original (6.75). Esto confirma que la división se hizo correctamente.</p>
          <img src="/img/niveles/mate/paso6divideci.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="División de números decimales"
        continueLink="/niveles/nivel2/mate/decimales/division/juegos"
      />
    </main>
  );
}