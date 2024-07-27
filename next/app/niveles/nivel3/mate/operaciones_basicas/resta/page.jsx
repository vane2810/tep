import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul } from "@/components/separador";

export default function RestaPage() {
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-yellow-100 py-4">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel3/mate/operaciones_basicas">
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
          <img src="/img/niveles/mate/terminosresta.png" alt="Suma" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 1*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 1</h2>
            <p className="mt-2 text-black text-center">Ubicamos los números uno debajo del otro haciendo que los valores posicionales correspondientes coincidan, así como se muestra en la imagen.</p>
          </div>
          <img src="/img/niveles/mate/nivel3/ob/resta/paso1restan3.png" alt="Resta" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 2*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 2</h2>
            <p className="mt-2 text-black text-center">Empezando por restar las unidades hacemos la siguiente pregunta: ¿cuánto le falta al 6 para llegar a 8?  Como el 6 es menor que el 8.  Así que el 7 debe pedir prestado a la siguiente cifra de la izquierda, es decir al 5, que al prestar una unidad queda convertido en 4.  Cuando el 6 la recibe queda convertido en 16. Recuerda que en el sistema posicional cada dígito de una casilla representa un grupo de diez de la casilla anterior.  Por esta razón el cuatro presta solo una unidad, pero cuando esta pasa a la casilla de la derecha representa diez unidades. Entonces decimos 16 – 8 =8 coloca esta respuesta en el apartado de respuesta de las unidades, luego seguiremos con las decenas como el 5 quedo en valor de 4 al prestarle al 7 entonces decimo 4 – 4 = 0 esa respuesta se colocará en la parte de respuesta de las decenas.</p>

          </div>
          <img src="/img/niveles/mate/nivel3/ob/resta/paso2restan3.png" alt="Resta" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 3*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 3</h2>
            <p className="mt-2 text-black text-center">Ahora en la parte de las centenas vemos que el 1 es menor que el 2 entonces vamos a prestarle al 8 y ahora el 8 queda en valor de 7, el 1 pasara a ser 11 entonces decimos 11 – 2 = 9 esta respuesta colócala en el apartado de las centenas, ahora seguiremos con las unidades de millar como el 8 quedo en valor de 7 por prestarle al 0, entonces ahora diremos 7 – 0 = 7 esta respuesta coloca la en la parte de respuesta de las unidades de millar.</p>
          </div>
          <img src="/img/niveles/mate/nivel3/ob/resta/paso3restan3.png" alt="Resta" className="h-32 w-auto ml-5" />
        </div>
      </section>

      {/* Paso 4*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 4</h2>
            <p className="mt-2 text-black text-center">Realizando las dos últimas operaciones, en la parte de las decenas de millar nos preguntamos ¿Cuánto en 3 menos 1? Pues es 2 entonces colocamos esa respuesta en el apartado de respuesta de las decenas de millar, por último, haremos las decenas de millar es decir 4 – 2 = 2 este resultado colócalo en la parte de respuesta de las centenas de millar para obtener nuestro resultado final. En este caso 438,155 – 210,248 = 227, 809.</p>
          </div>
          <img src="/img/niveles/mate/nivel3/ob/resta/paso4restan3.png" alt="Resta" className="h-32 w-auto ml-4" />
        </div>
      </section>
    </main>
  );
}