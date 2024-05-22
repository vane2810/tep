import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul, SeparadorAnaranjado, SeparadorRojo } from "@/components/separador";

export default function DivisionPage(){
    return (
        <main>
          {/* Bienvenida de Donkey */}
          <section>
            <SeparadorAzul />
            <div className="bg-red-200 py-8">
              <div className="flex flex-col items-center justify-center mt-4 mb-5 text-center">
                <div className="flex items-center justify-center">
                  <img src="/img/niveles/mate/signodivision.png" alt="Animated Image" className="h-64 w-43 mr-4" />
                  <p className="text-black super text-[50px] max-w-lg">DIVISIÓN</p>
                </div>
              </div>
            </div>
            <SeparadorRojo/>
        </section>
    
          {/*terminos*/}
        <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Terminos de la división</h2>
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
                <p className="mt-2 text-black text-center">Tomamos la primera cifra del dividendo. Si esta cifra es más pequeña que el divisor, entonces tendremos que coger otra cifra más del dividendo. En nuestro ejemplo la primera cifra del dividendo es 6, pero como es más pequeña que el divisor, que es 64, tenemos que coger otra cifra más: 64</p>
                
              </div>
              <img src="/img/niveles/mate/paso1divisionn3.png" alt="Resta" className="h-32 w-auto ml-4" />
            </div>
          </section>
    
          {/*Paso 2*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 2</h2>
                <p className="mt-2 text-black text-center">Buscamos un número que al multiplicarlo por el divisor nos dé como resultado el dividendo. Si no lo hay, buscamos el resultado menor más próximo. El resultado de la multiplicación se resta al dividendo. Nosotros tenemos que dividir 64 entre 64. Buscamos un número que multiplicado por 64 me dé 64. Como es exacto: 64 x 1 = 64 En este caso, escribimos el 1 en el cociente y el 64 se lo restamos a 64: 64 – 64 = 0. Luego bajamos el siguiente divisor que es 8. Como 8 es menos que el divisor en ese caso se dice 0 al cociente, se le agrega un cero al cociente y se baja el siguiente que seria 5, entonces nos queda un numero multiplicado por 64 nos de 85.</p>
              </div>
              <img src="/img/niveles/mate/paso2divisionn3.png" alt="Multiplicación" className="h-32 w-auto ml-5" />
            </div>
          </section>
    
          {/* Paso 3*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 3</h2>
                <p className="mt-2 text-black text-center">Continuando con la búsqueda del numero cercano o igual a 85 vemos que el numero mas cercano es 64 x 1 = 64 entonces colocamos el uno en el cociente y a 85 le vamos a restar el 64, en este caso como 5 es menor que 4 le vamos a prestar al 8 nos quedaría como 15 y el 8 quedaría en valor de 7, entonces decimos 15 – 4 = 11 ponemos 1 y llevamos uno, como el 8 había quedado en valor de 7 pero como llevamos 1 entonces  7 + 1= 8 entonces decimos 8 + 6= 2, nos sobra 21 en el residuo entonces bajamos el siguiente dividendo que es 3, entonces tenemos 213 vamos a buscar un número que multiplicado por 64 nos de 213 o cerca, podemos decir que es  al 3, 64 x 3 = 192 entonces ponemos el 3 en el cociente y a 213 le vamos a restar 192.</p>
              </div>
              <img src="/img/niveles/mate/paso3divisionn3.png" alt="División" className="h-32 w-auto ml-4" />
            </div>
          </section>


          {/* Paso 4*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso </h2>
                <p className="mt-2 text-black text-center">Al realizar la esta nos sobraron 21 en el cociente quiere decir que nuestra división es inexacta ya que no nos sobro 0. Entonces 64,853 ÷ 54 = 1,013.</p>
              </div>
              <img src="/img/niveles/mate/paso4divisionn3.png" alt="División" className="h-32 w-auto ml-4" />
            </div>
          </section>
        </main>
    );
}