import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul, SeparadorAnaranjado, SeparadorRojo } from "@/components/separador";

export default function DivisionPage() {
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-red-200 py-4">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel2/mate/operaciones_basicas">
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
            <p className="mt-2 text-black text-center">Tomamos la primera cifra del dividendo. Si esta cifra es más pequeña que el divisor, entonces tendremos que coger otra cifra más del dividendo. En nuestro ejemplo la primera cifra del dividendo es 7, pero como es más pequeña que el divisor, que es 25, tenemos que coger otra cifra más: 78</p>

          </div>
          <img src="/img/niveles/mate/nivel2/ob/division/paso1divisionn2.png" alt="Resta" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 2*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 2</h2>
            <p className="mt-2 text-black text-center">Buscamos un número que al multiplicarlo por el divisor nos dé como resultado el dividendo. Si no lo hay, buscamos el resultado menor más próximo. El resultado de la multiplicación se resta al dividendo. Nosotros tenemos que dividir 25 entre 78. Buscamos un número que multiplicado por 25 me dé 78. Como no es exacto buscamos el menor más próximo: 25x 3 = 75. En este caso, 75 es el número más cercano a 78 siendo menor. Por lo tanto escribimos el 3 en el cociente y el 75 se lo restamos a 78: 78 – 75 = 3. Luego bajamos el siguiente divisor que es 8.</p>
          </div>
          <img src="/img/niveles/mate/nivel2/ob/division/paso2divisionn2.png" alt="Multiplicación" className="h-32 w-auto ml-5" />
        </div>
      </section>

      {/* Paso 3*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 3</h2>
            <p className="mt-2 text-black text-center">Buscamos un número que al multiplicarlo por el divisor nos dé como resultado el dividendo. Si no lo hay, buscamos el resultado menor más próximo. El resultado de la multiplicación se resta al dividendo. Nosotros tenemos que dividir 25 entre 78. Buscamos un número que multiplicado por 25 me dé 78. Como no es exacto buscamos el menor más próximo: 25x 3 = 75. En este caso, 75 es el número más cercano a 78 siendo menor. Por lo tanto escribimos el 3 en el cociente y el 75 se lo restamos a 78: 78 – 75 = 3. Luego bajamos el siguiente divisor que es 8.</p>
          </div>
          <img src="/img/niveles/mate/nivel2/ob/division/paso3divisionn2.png" alt="División" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/* Paso 4*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 4</h2>
            <p className="mt-2 text-black text-center">Luego bajamos el siguiente numero que es 9 y buscaríamos un numero que multiplicado por 25 nos de 139, pero lo mas cercano es 25 x 5 = 125. Entonces vamos a colocar el 5 en el cociente y a 139 – 125 = 14.</p>
          </div>
          <img src="/img/niveles/mate/nivel2/ob/division/paso4divisionn2.png" alt="División" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/* Paso 5*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 5</h2>
            <p className="mt-2 text-black text-center">Entonces nuestro residuo nos dio 14, esto quiere decir que si nos sobra es una división inexacta. Nuestro cociente es 315.</p>
          </div>
          <img src="/img/niveles/mate/nivel2/ob/division/paso5divisionn2.png" alt="División" className="h-32 w-auto ml-4" />
        </div>
      </section>
    </main>
  );
}