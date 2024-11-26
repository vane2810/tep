import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul } from "@/components/separador";

export default function SumaPage() {
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-green-100 py-4">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel2/mate/operaciones_basicas">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/signomas.png" alt="Animated Image" className="h-64 w-auto mr-4" />
              <p className="text-black super text-[40px] max-w-lg">SUMA</p>
            </div>
          </div>
        </div>
        <SeparadorVerde />
      </section>

      {/*terminos*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Terminos de la suma</h2>
            <p className="mt-2 text-black text-center">Sumando, sumando y total</p>
          </div>
          <img src="/img/niveles/mate/terminossuma.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 1*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 1</h2>
            <p className="mt-2 text-black text-wrap">Primero debemos ubicar los sumandos uno debajo del otro, puedes imaginar líneas verticales que forman casillas.  En la primera casilla de derecha a izquierda deben estar las unidades, en la segunda las decenas, en la tercera las centenas, en la cuarta las unidades de millar y en la quinta y ultima las decenas de millar.</p>
          </div>
          <img src="/img/niveles/mate/nivel2/ob/suma/paso1suman2.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 2*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 2</h2>
            <p className="mt-2 text-black text-wrap">Ahora sumamos los dígitos que están en una misma columna, empezamos por las unidades: 6 + 2 = 8 y las decenas 2 + 6 = 8. Ponemos los resultados en casilla de las unidades de la respuesta y en de las decenas, que estará ubicada bajo una línea horizontal. Así como lo muestra la imagen.</p>

          </div>
          <img src="/img/niveles/mate/nivel2/ob/suma/paso2suman2.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 3*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 3</h2>
            <p className="mt-2 text-black text-wrap">Seguimos con las centenas:  4 + 3 = 7 ubicamos esta suma en el lugar de las centenas de la respuesta. Ahora el de las unidades de millar: 3 + 5 = 8 así que ahora ubicamos en el lugar de las unidades de millar en la parte de la respuesta como lo hacemos en la imagen.</p>
          </div>
          <img src="/img/niveles/mate/nivel2/ob/suma/paso3suman2.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*paso 4*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 4</h2>
            <p className="mt-2 text-black text-center">Finalmente operamos 2 + 1 = 3, poniendo ese número en la casilla reservada para las decenas de millar para obtener nuestro resultado final.</p>
          </div>
          <img src="/img/niveles/mate/nivel2/ob/suma/paso4suman2.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>
    </main>
  );
}

