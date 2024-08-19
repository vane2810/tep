// Página de contenido de la resta - Nivel 1
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorAmarillo } from "@/components/separador";
import Modal from "@/components/modals/games/leccionModal";
export default function RestaPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      {/* Bienvenida de personaje */}
      <section>
        <SeparadorAzul />
        <div className="bg-yellow-100 py-4">
          {/* Volver */}
          <div className="mt-2 ml-10 inline-block">
            <Link href="/niveles/nivel1/mate/operaciones_basicas">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/signomenos.png" alt="Animated Image" className="h-64 w-43 mr-4" />
              <p className="text-black super text-[50px] max-w-lg">RESTA</p>
            </div>
          </div>
        </div>
        <SeparadorAmarillo />
      </section>

      {/*terminos*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Terminos de la resta</h2>
            <p className="mt-2 text-black text-center">Minuendo, sustraendo y diferencia.</p>
          </div>
          <img src="/img/niveles/mate/terminosresta.png" alt="resta" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 1*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 1</h2>
            <p className="mt-2 text-black text-center">Ubicamos los números uno debajo del otro haciendo que los valores posicionales correspondientes coincidan, así como se muestra en la imagen.</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/resta/paso1resta.png" alt="resta" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 2*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 2</h2>
            <p className="mt-2 text-black text-center">Empezando por restar las unidades hacemos la siguiente pregunta: ¿cuánto le falta al 6 para llegar a 0?  Como el cero es menor que el seis 0 menor a 6,  esta pregunta no tiene sentido.  Así que el cero debe pedir prestado a la siguiente cifra de la izquierda, es decir al 4 , que al prestar una unidad queda convertido en 3 .  Cuando el 0 la recibe queda convertido en 10. Recuerda que en el sistema posicional cada dígito de una casilla representa un grupo de diez de la casilla anterior.  Por esta razón el cuatro presta solo una unidad, pero cuando esta pasa a la casilla de la derecha representa diez unidades.</p>

          </div>
          <img src="/img/niveles/mate/nivel1/ob/resta/paso2resta.png" alt="Resta" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 3*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 3</h2>
            <p className="mt-2 text-black text-center">Con los nuevos números realizamos la resta de la casilla de las unidades, nos volvemos a preguntar: ¿cuánto le falta al 6  para llegar a  10? Como la respuesta es 4 , ponemos ese número en la casilla de las unidades de la respuesta.</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/resta/paso3resta.png" alt="resta" className="h-32 w-auto ml-5" />
        </div>
      </section>

      {/* Paso 4*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 4</h2>
            <p className="mt-2 text-black text-center">Podemos ahora seguir con la columna de las decenas.  Recordando que el cuatro fue transformado en tres nos preguntamos: ¿cuánto le falta al 9 para llegar a 3 ?. Nuevamente la pregunta carece de sentido ya que tres es menor que nueve,   Para solucionar este problema el 3  debe pedir prestado a la siguiente cifra de la izquierda, el cinco 5. Al prestar una unidad, el cinco queda convertido en 4 ; mientras que al recibirla, el 3  queda convertido en 13.</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/resta/paso4resta.png" alt="resta" className="h-32 w-auto ml-4" />
        </div>
      </section>
      {/* Paso 5*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 5</h2>
            <p className="mt-2 text-black text-center">Realizamos la resta de las decenas con  los números resultantes: ahora nos preguntamos: ¿cuánto le falta al 9  para llegar a  13? Como la respuesta es cuatro, ese es el número que debe ser puesto en la casilla de las decenas de la respuesta:</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/resta/paso5resta.png" alt="resta" className="h-32 w-auto ml-4" />
        </div>
      </section>
      {/* Paso 6*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 6</h2>
            <p className="mt-2 text-black text-center">Finalmente restamos la columna de las centenas.  Teniendo en cuenta que el cinco fue transformado en cuatro hacemos la pregunta: ¿cuánto le falta al 1 para llegar a 4 ?  Como la respuesta es 3 , ponemos ese resultado en la casilla de las unidades de la solución.  Obtenemos: 540-196= 344</p>
          </div>
          <img src="/img/niveles/mate/nivel1/ob/resta/paso6resta.png" alt="resta" className="h-32 w-auto ml-4" />
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
        subjectName="Resta"
        continueLink="/niveles/nivel1/mate/operaciones_basicas/resta/juegos"
      />
    </main>
  );
}