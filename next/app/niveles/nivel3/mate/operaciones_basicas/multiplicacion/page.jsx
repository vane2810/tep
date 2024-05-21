import React from "react";
import Link from 'next/link';
import { SeparadorRosa, SeparadorVerde, SeparadorCeleste, SeparadorAmarillo, SeparadorMorado, SeparadorAzul, SeparadorAnaranjado } from "@/components/separador";

export default function MultiplicacionPage(){
    return (
        <main>
          {/* Bienvenida de Donkey */}
          <section>
            <SeparadorAzul />
            <div className="bg-orange-200 py-8">
              <div className="flex flex-col items-center justify-center mt-4 mb-5 text-center">
                <div className="flex items-center justify-center">
                  <img src="/img/niveles/mate/signomultiplicacion.png" alt="Animated Image" className="h-64 w-43 mr-4" />
                  <p className="text-black super text-[50px] max-w-lg">MULTIPLICACIÓN</p>
                </div>
              </div>
            </div>
            <SeparadorAnaranjado/>
        </section>
    
          {/*Paso 1*/}
        <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 1</h2>
                <p className="mt-2 text-black text-center">Multiplicar el multiplicador de la derecha con los numeros del multiplicando, el 4 se multiplica primero por 2 luego por el 0 y por ultimo el 1.</p>
              </div>
              <img src="/img/niveles/mate/paso1multiplicacion.png" alt="Suma" className="h-32 w-auto ml-4" />
            </div>
        </section>
    
          {/*Paso 2*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 2</h2>
                <p className="mt-2 text-black text-center">Se multiplica el segundo multiplicador que es el 1 y se multiplicara por el 2 primero, luego 0 y por ultimo el 1. </p>
                
              </div>
              <img src="/img/niveles/mate/paso2multiplicacion.png" alt="Resta" className="h-32 w-auto ml-4" />
            </div>
          </section>
    
          {/*Paso 3*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 3</h2>
                <p className="mt-2 text-black text-center">Se suma los resultados para obtener el producto</p>
              </div>
              <img src="/img/niveles/mate/paso3multiplicacion.png" alt="Multiplicación" className="h-32 w-auto ml-5" />
            </div>
          </section>
    
          {/* Paso 4*/}
          <section className="my-10 px-4">
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <h2 className="text-2xl font-semibold">Paso 4</h2>
                <p className="mt-2 text-black text-center">El producto es 1,428.</p>
              </div>
              <img src="/img/niveles/mate/paso4multiplicacion.png" alt="División" className="h-32 w-auto ml-4" />
            </div>
          </section>
        </main>
    );
}