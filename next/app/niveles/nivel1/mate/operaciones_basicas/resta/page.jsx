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
    
          {/*Paso 1*/}
        <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 1</h2>
                <p className="mt-2 text-black text-center">Ubicamos los números uno debajo del otro haciendo que los valores posicionales correspondientes coincidan, así como se muestra en la imagen.</p>
              </div>
              <img src="/img/niveles/mate/paso1resta.png" alt="Suma" className="h-32 w-auto ml-4" />
            </div>
        </section>
    
          {/*Paso 2*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 2</h2>
                <p className="mt-2 text-black text-center">Empezando por restar las unidades hacemos la siguiente pregunta: ¿cuánto le falta al 6 para llegar a 0?  Como el cero es menor que el seis 0 menor a 6,  esta pregunta no tiene sentido.  Así que el cero debe pedir prestado a la siguiente cifra de la izquierda, es decir al 4 , que al prestar una unidad queda convertido en 3 .  Cuando el 0 la recibe queda convertido en 10. Recuerda que en el sistema posicional cada dígito de una casilla representa un grupo de diez de la casilla anterior.  Por esta razón el cuatro presta solo una unidad, pero cuando esta pasa a la casilla de la derecha representa diez unidades.</p>
                
              </div>
              <img src="/img/niveles/mate/paso2resta.png" alt="Resta" className="h-32 w-auto ml-4" />
            </div>
          </section>
    
          {/*Paso 3*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 3</h2>
                <p className="mt-2 text-black text-center">Con los nuevos números realizamos la resta de la casilla de las unidades, nos volvemos a preguntar: ¿cuánto le falta al 6  para llegar a  10? Como la respuesta es 4 , ponemos ese número en la casilla de las unidades de la respuesta.</p>
              </div>
              <img src="/img/niveles/mate/paso3resta.png" alt="Multiplicación" className="h-32 w-auto ml-5" />
            </div>
          </section>
    
          {/* Paso 4*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 4</h2>
                <p className="mt-2 text-black text-center">Podemos ahora seguir con la columna de las decenas.  Recordando que el cuatro fue transformado en tres nos preguntamos: ¿cuánto le falta al 9 para llegar a 3 ?. Nuevamente la pregunta carece de sentido ya que tres es menor que nueve,   Para solucionar este problema el 3  debe pedir prestado a la siguiente cifra de la izquierda, el cinco 5. Al prestar una unidad, el cinco queda convertido en 4 ; mientras que al recibirla, el 3  queda convertido en 13.</p>
              </div>
              <img src="/img/niveles/mate/paso4resta.png" alt="División" className="h-32 w-auto ml-4" />
            </div>
          </section>
          {/* Paso 5*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 5</h2>
                <p className="mt-2 text-black text-center">Realizamos la resta de las decenas con  los números resultantes: ahora nos preguntamos: ¿cuánto le falta al 9  para llegar a  13? Como la respuesta es cuatro, ese es el número que debe ser puesto en la casilla de las decenas de la respuesta:</p>
              </div>
              <img src="/img/niveles/mate/paso5resta.png" alt="División" className="h-32 w-auto ml-4" />
            </div>
          </section>
          {/* Paso 6*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 7</h2>
                <p className="mt-2 text-black text-center">Finalmente restamos la columna de las centenas.  Teniendo en cuenta que el cinco fue transformado en cuatro hacemos la pregunta: ¿cuánto le falta al 1 para llegar a 4 ?  Como la respuesta es 3 , ponemos ese resultado en la casilla de las unidades de la solución.  Obtenemos: 540-196= 344</p>
              </div>
              <img src="/img/niveles/mate/paso6resta.png" alt="División" className="h-32 w-auto ml-4" />
            </div>
          </section>
        </main>
      );
}