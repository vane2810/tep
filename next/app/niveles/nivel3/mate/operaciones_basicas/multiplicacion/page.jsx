import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul, SeparadorAnaranjado } from "@/components/separador";

export default function MultiplicacionPage() {
  return (
    <main>
      {/* Bienvenida de Donkey */}
      <section>
        <SeparadorAzul />
        <div className="bg-orange-200 py-4">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel3/mate/operaciones_basicas">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex items-center justify-center">
              <img src="/img/niveles/mate/signomultiplicacion.png" alt="Animated Image" className="h-64 w-43 mr-4" />
              <p className="text-black super text-[50px] max-w-lg">MULTIPLICACIÓN</p>
            </div>
          </div>
        </div>
        <SeparadorAnaranjado />
      </section>

      {/*terminos*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Terminos de la multiplicación</h2>
            <p className="mt-2 text-black text-center">Multiplicando, multiplicador, producto o total.</p>
          </div>
          <img src="/img/niveles/mate/terminosmultiplicacion.png" alt="multiplicacion" className="h-32 w-auto ml-4" />
        </div>
      </section>


      {/*Paso 1*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 1</h2>
            <p className="mt-2 text-black text-center">Coloca las cifras a que la cifra mayor vaya a la parte de arriba y la cifra más menor vaya debajo que es ese será el multiplicando.</p>
          </div>
          <img src="/img/niveles/mate/nivel3/ob/multiplicacion/paso1multin3.png" alt="multiplicacion" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 2*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 2</h2>
            <p className="mt-2 text-black text-center">Multiplicar el multiplicador de la derecha con los números del multiplicando, el 3 se multiplica primero por 7 luego por el 5, 0, 8 y por último el 3. </p>

          </div>
          <img src="/img/niveles/mate/nivel3/ob/multiplicacion/paso2multin3.png" alt="multiplicacion" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/*Paso 3*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 3</h2>
            <p className="mt-2 text-black text-center">Se multiplica el segundo multiplicador que es el 4 y se multiplicara por el 7 primero, luego por el 5, 0, 8 y por último el 3.</p>
          </div>
          <img src="/img/niveles/mate/nivel3/ob/multiplicacion/paso3multin3.png" alt="Multiplicación" className="h-32 w-auto ml-5" />
        </div>
      </section>

      {/* Paso 4*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 4</h2>
            <p className="mt-2 text-black text-center">Se multiplica el tercer multiplicador que es el 1 y se multiplicara por el 7 primero, luego por el 5, 0, 8 y por último el 3.</p>
          </div>
          <img src="/img/niveles/mate/nivel3/ob/multiplicacion/paso4multin3.png" alt="multiplicacion" className="h-32 w-auto ml-4" />
        </div>
      </section>

      {/* Paso 5*/}
      <section className="my-10 px-4">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-semibold">Paso 5</h2>
            <p className="mt-2 text-black text-center">Se suma los resultados para obtener el producto. El producto es: 5,412,151.</p>
          </div>
          <img src="/img/niveles/mate/nivel3/ob/multiplicacion/paso5multin3.png" alt="multiplicacion" className="h-32 w-auto ml-4" />
        </div>
      </section>
    </main>
  );
}