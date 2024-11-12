// Página de Inicio
import React from "react";
import Carousel from "../components/home/carousel";
import Typewriter from "../components/typeWriter";
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const InicioPage= dynamic(() => import('../components/home/homepage'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      
{/* Bienvenida de Starly */}
<div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-10 px-4 md:px-0">
    <img
        src="/img/personajes/starly/starlycohete.png"
        alt="Starly"
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-6 md:mb-0 md:mr-10 animate-tumble"
    />
    <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl wonder text-center md:text-left">
        <Typewriter
            text="  ¡Hola! Soy Starly y te estaré acompañando en esta aventura"
            speed={40}
        />
    </div>
</div>

      <SeparadorRosa />
    
      
      <div className="flex justify-center">
        {/* Botones (Planetas) */}
        <InicioPage />
      </div>
      <SeparadorRosa />  
      
      {/* Starly */}
      <div className="flex md:flex-row flex-col justify-center items-center mt-10 mb-10">

        <Carousel />
      </div>
    </main>
  );
}