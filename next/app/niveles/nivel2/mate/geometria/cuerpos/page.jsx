// Página de contenido de cuerpos geometricos - Nivel 2
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
              <img src="/img/niveles/mate/figangu.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">CUERPOS GEOMÉTRICOS</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/* paso 1 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center"> ¿Qué es un cuerpo geométrico?</h2>
          <p className="mt-2 text-black text-center">Un cuerpo geométrico es una figura tridimensional, lo que significa que tiene tres dimensiones: largo, ancho y altura. A diferencia de las figuras planas, que solo tienen dos dimensiones (como un cuadrado o un círculo), los cuerpos geométricos ocupan espacio y tienen volumen. Ejemplos de cuerpos geométricos son los cubos, prismas y cilindros.</p>
        </div>
      </section>
      
      {/* paso 2 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cubo: Identificación y Características</h2>
          <p className="mt-2 text-black text-center">Identificación: Un cubo es un cuerpo geométrico que parece un dado. Tiene 6 caras (todas en forma de cuadrado), 12 aristas (las líneas donde se encuentran dos caras), y 8 vértices (los puntos donde se juntan las aristas).</p>
          <p className="mt-2 text-black text-center">Características: Todos los lados de un cubo son iguales. Esto significa que todas las caras del cubo son cuadrados idénticos. Un cubo es un tipo especial de prisma, llamado prisma cuadrado.</p>
          <img src="/img/niveles/mate/paso2cuer.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 3 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Prisma: Identificación y Características</h2>
          <p className="mt-2 text-black text-center">Identificación: Un prisma es un cuerpo geométrico que tiene dos bases paralelas e iguales, y las caras laterales son rectángulos. Los prismas se nombran según la forma de sus bases. Por ejemplo, un prisma triangular tiene bases en forma de triángulo.</p>
          <p className="mt-2 text-black text-center">Características: Un prisma tiene tantos lados como aristas tiene la base. Si la base es un triángulo, el prisma tendrá 3 lados en cada base y 3 caras laterales rectangulares. En total, tiene 5 caras, 9 aristas y 6 vértices.</p>
          <img src="/img/niveles/mate/paso3cuer.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* paso 4 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Cilindro: Identificación y Características</h2>
          <p className="mt-2 text-black text-center">Identificación: Un cilindro es un cuerpo geométrico con dos bases circulares paralelas y una superficie curva que conecta las bases. Es similar a una lata de refresco.</p>
          <p className="mt-2 text-black text-center">Características: Un cilindro no tiene aristas ni vértices, pero tiene 2 caras planas (las bases) y una cara curva (la superficie lateral). La altura del cilindro es la distancia entre sus dos bases.</p>
          <img src="/img/niveles/mate/paso4cuer.png" alt="Suma" className="h-32 w-auto mt-4" />
        </div>
      </section>

      {/* Paso 5 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Diferencia entre figuras planas y cuerpos geométricos</h2>
          <p className="mt-2 text-black text-center">Las figuras planas, como los cuadrados o los círculos, solo tienen largo y ancho, pero no profundidad. Por otro lado, los cuerpos geométricos, como los cubos, prismas y cilindros, tienen largo, ancho y altura, lo que les da volumen y los hace tridimensionales.</p>
        </div>
      </section>

      {/* Paso 6 */}
      <section className="my-10 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center">Importancia de los cuerpos geométricos</h2>
          <p className="mt-2 text-black text-center">Los cuerpos geométricos son fundamentales porque nos ayudan a comprender y construir el mundo tridimensional en el que vivimos. Desde las cajas de cartón (cubos) hasta los edificios (prismas) y los tubos (cilindros), estos cuerpos están por todas partes. Entender sus características nos permite identificar y utilizar estos objetos en la vida diaria.</p>
          <img src="/img/niveles/mate/paso6cuer.png" alt="Suma" className="h-32 w-auto mt-4" />
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
        subjectName="Cuerpos Geométricos"
        continueLink="/niveles/nivel2/mate/geometria/cuerpos/juegos"
      />
    </main>
  );
}