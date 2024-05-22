import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul } from "@/components/separador";

export default function RestaPage(){
    return (
        <main>
          {/* Bienvenida de Donkey */}
          <section>
            <SeparadorAzul />
            <div className="bg-yellow-100 py-8">
              <div className="flex flex-col items-center justify-center mt-4 mb-5 text-center">
                <div className="flex items-center justify-center">
                  <img src="/img/niveles/mate/signomenos.png" alt="Animated Image" className="h-64 w-43 mr-4" />
                  <p className="text-black super text-[50px] max-w-lg">RESTA</p>
                </div>
              </div>
            </div>
            <SeparadorAmarillo/>
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
                <p className="mt-2 text-black text-center">Ubicamos los números uno debajo del otro haciendo que los valores posicionales correspondientes coincidan, así como se muestra en la imagen</p>
              </div>
              <img src="/img/niveles/mate/paso1restan2.png" alt="resta" className="h-32 w-auto ml-4" />
            </div>
        </section>
    
          {/*Paso 2*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 2</h2>
                <p className="mt-2 text-black text-center">Empezando por restar las unidades hacemos la siguiente pregunta: ¿cuánto le falta al 7 para llegar a 8?  Como el 7 es menor que el 8.  Así que el 7 debe pedir prestado a la siguiente cifra de la izquierda, es decir al 5, que al prestar una unidad queda convertido en 4. Cuando el 7 la recibe queda convertido en 17. Recuerda que en el sistema posicional cada dígito de una casilla representa un grupo de diez de la casilla anterior.  Por esta razón el cuatro presta solo una unidad, pero cuando esta pasa a la casilla de la derecha representa diez unidades. Entonces decimos 17 – 8 =9 coloca esta respuesta en el apartado de respuesta de las unidades, luego seguiremos con las decenas como el 5 quedo en valor de 4 al prestarle al 7 entonces decimo 4 – 4 = 0 esa respuesta se colocará en la parte de respuesta de las decenas.</p>
                
              </div>
              <img src="/img/niveles/mate/paso2restan2.png" alt="resta" className="h-32 w-auto ml-4" />
            </div>
          </section>
    
          {/*Paso 3*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 3</h2>
                <p className="mt-2 text-black text-center">Ahora en la parte de las centenas vemos que el 0 es menor que el 2 entonces vamos a prestarle al 8 y ahora el 8 queda en valor de 7, el cero pasara a ser 10 entonces decimos 10 – 2 = 8 esta respuesta colócala en el apartado de las centenas, ahora seguiremos con las unidades de millar como el 8 quedo en valor de 7 por prestarle al 0, entonces ahora diremos 7 – 0 = 7 esta respuesta coloca la en la parte de respuesta de las unidades de millar.</p>
              </div>
              <img src="/img/niveles/mate/paso3restan2.png" alt="resta" className="h-32 w-auto ml-5" />
            </div>
          </section>
    
          {/* Paso 4*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 4</h2>
                <p className="mt-2 text-black text-center">Realizando la última operación en la parte de las decenas de millar nos preguntamos ¿Cuánto en 3 menos 1? Pues es 2 entonces colocamos esa respuesta en el apartado de respuesta de las decenas de millar para obtener nuestro resultado final. En este caso 38,057 – 10,248 = 27, 809.</p>
              </div>
              <img src="/img/niveles/mate/paso4restan2.png" alt="resta" className="h-32 w-auto ml-4" />
            </div>
          </section>
        </main>
      );
}