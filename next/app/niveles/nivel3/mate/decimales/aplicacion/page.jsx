<<<<<<< HEAD
// Página de contenido de numeros decimales en la vida cotidiana - Nivel 3
=======
// Página de contenido de Números decimales en la vida cotidiana - Nivel 3
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorVerde } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";

<<<<<<< HEAD
export default function OperacionesPage() {
=======
export default function AplicacionPage() {
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec

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
<<<<<<< HEAD
              <img src="/img/niveles/mate/compafig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">NUMEROS DECIMALES EN LA VIDA COTIDIANA</p>
=======
              <img src="/img/niveles/mate/introfig.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">CONVERSIÓN ENTRE FRACCIONES Y DECIMALES</p>
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
<<<<<<< HEAD
          <h2 className="text-2xl font-semibold text-center">Compras en tiendas</h2>
          <p className="mt-2 text-black text-center">Cuando compras algo en una tienda, los precios suelen incluir centavos, que son partes de un dólar o un peso. Por ejemplo, si un juguete cuesta $3.75, los 0.75 representan 75 centavos, lo que significa que no estás pagando solo 3 dólares o pesos, sino 3 con un poco más.</p>
          <img src="/img/niveles/mate/paso1vida.png" alt="Suma" className="h-32 w-auto mt-4" />
=======
          <h2 className="text-2xl font-semibold text-center">¿Qué es una fracción?</h2>
          <p className="mt-2 text-black text-center">Una fracción representa una parte de un todo. Por ejemplo, 1/2 significa que tienes una mitad de algo.</p>
          <img src="/img/niveles/mate/paso1companum.png" alt="Suma" className="h-32 w-auto mt-4" />
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
<<<<<<< HEAD
          <h2 className="text-2xl font-semibold text-center">Medición de longitudes</h2>
          <p className="mt-2 text-black text-center">Los decimales se usan para medir longitudes con mayor precisión. Por ejemplo, si mides tu altura y es 1.65 metros, el 0.65 te dice que eres un poquito más alto que 1 metro y medio. Sin decimales, sería difícil ser exacto en estas mediciones.</p>
          <img src="/img/niveles/mate/paso2vida.png" alt="Suma" className="h-32 w-auto mt-4" />
=======
          <h2 className="text-2xl font-semibold text-center">¿Qué es un número decimal?</h2>
          <p className="mt-2 text-black text-center">Un número decimal también representa partes de un todo, pero se escribe con un punto decimal. Por ejemplo, 0.5 es lo mismo que 1/2.</p>
          <img src="/img/niveles/mate/paso2companum.png" alt="Suma" className="h-32 w-auto mt-4" />
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
<<<<<<< HEAD
          <h2 className="text-2xl font-semibold text-center">Tiempo y duración</h2>
          <p className="mt-2 text-black text-center">Los decimales también se usan para medir el tiempo, especialmente en deportes o cronometraje. Si corres una carrera y tu tiempo es 12.5 segundos, eso significa que corriste en 12 segundos y medio. Este nivel de precisión es importante en competencias.</p>
          <img src="/img/niveles/mate/paso3vida.png" alt="Suma" className="h-32 w-auto mt-4" />
=======
          <h2 className="text-2xl font-semibold text-center">Convertir una fracción a decimal: Paso 1</h2>
          <p className="mt-2 text-black text-center">Para convertir una fracción a un decimal, divide el número de arriba (numerador) entre el número de abajo (denominador). Ejemplo: 1/4 → 1 ÷ 4 = 0.25.</p>
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
<<<<<<< HEAD
          <h2 className="text-2xl font-semibold text-center">Recetas de Cocina</h2>
          <p className="mt-2 text-black text-center">Cuando sigues una receta, a veces las cantidades de los ingredientes están en decimales. Por ejemplo, podrías necesitar 0.5 litros de leche o 1.25 tazas de azúcar. Los decimales te ayudan a medir con precisión para que la receta salga perfecta.</p>
          <img src="/img/niveles/mate/paso4vida.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

=======
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
    
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec
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
<<<<<<< HEAD
        subjectName="Numeros decimales en la vida cotidiana"
=======
        subjectName="Conversión entre fracciones y números decimales"
>>>>>>> 249cf6fb38778f09903c764952174c57eb9f20ec
        continueLink="/niveles/nivel3/mate/decimales/aplicacion/juegos"
      />
    </main>
  );
}