"use client";
import React, { useState } from "react";
import Link from 'next/link';
import Modal from "@/components/modals/games/mate/ob/leccionModal";
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul, SeparadorAnaranjado, SeparadorRojo } from "@/components/separador";

export default function DivisionPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-red-200 py-4">
          {/* Volver */}
          <div className="mt-2 ml-10 inline-block">
            <Link href="/niveles/nivel1/mate/operaciones_basicas">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/signodivision.png" alt="Animated Image" className="h-64 w-43 mr-4" />
              <p className="text-black super text-[50px] max-w-lg">DIVISIÓN</p>
            </div>
          </div>
        </div>
        <SeparadorRojo />
      </section>

      {/*terminos*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Términos de la división</h2>
            <p className="mt-2 text-black text-center">Dividendo, divisor, cociente y residuo.</p>
          </div>
          <img src="/img/niveles/mate/terminosdivision.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 1*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 1</h2>
            <p className="mt-2 text-black text-center">Tomamos la primera cifra del dividendo. Si esta cifra es más pequeña que el divisor, entonces tendremos que coger otra cifra más del dividendo. En nuestro ejemplo la primera cifra del dividendo es 2, pero como es más pequeña que el divisor, que es 5, tenemos que coger otra cifra más: 24</p>

          </div>
          <img src="/img/niveles/mate/nivel1/ob/division/paso1division.png" alt="Resta" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 2*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 2</h2>
            <p className="mt-2 text-black text-center">Buscamos un número que al multiplicarlo por el divisor nos dé como resultado el dividendo. Si no lo hay, buscamos el resultado menor más próximo. El resultado de la multiplicación se resta al dividendo. Nosotros tenemos que dividir 24 entre 5. Buscamos un número que multiplicado por 5 me dé 24. Como no es exacto buscamos el menor más próximo: 4 x 5 = 20. En este caso, 20 es el número más cercano a 24 siendo menor. Por lo tanto escribimos el 4 en el cociente y el 20 se lo restamos a 24: 24 – 20 = 4.</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/division/paso2division.png" alt="Multiplicación" className="h-32 w-auto ml-5" />
        </div>
      </section>

      {/* Paso 3*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 3</h2>
            <p className="mt-2 text-black text-center">Bajamos la siguiente cifra del dividendo y realizamos de nuevo el paso 2. Bajamos la siguiente cifra que es el 3. Con el 4 que ya teníamos y con el 3 que acabamos de bajar obtenemos el 43. Ahora dividimos 43 entre 5. Buscamos un número que multiplicado por 5 nos dé 43. Como no es exacto buscamos un número que nos dé el número menor más próximo. En este caso 5 x 8 = 40. Escribimos el 8 en el cociente y el 40 lo escribimos debajo del 43 para restarlo: 43 – 40 = 3. Como no hay más cifras en el dividendo, hemos terminado la división. Por lo tanto el cociente es 48 y residuo 3.</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/division/paso3division.png" alt="División" className="h-32 w-auto ml-4" />
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
        subjectName="División"
        continueLink="/niveles/nivel1/mate/operaciones_basicas/division/juegos"
      />
    </main>
  );
}