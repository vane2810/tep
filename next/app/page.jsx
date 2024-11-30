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
<div className="flex md:flex-row flex-col justify-center items-center mt-10 mb-10 px-4 md:px-0">
    <img
        src="/img/personajes/starly/starlycohete.webp"
        alt="Starly"
        className="md:mr-10 mb-6 md:mb-0 w-24 sm:w-32 md:w-40 lg:w-48 h-24 sm:h-32 md:h-40 lg:h-48 animate-tumble"
    />
    <div className="font-bold text-center text-lg sm:text-xl md:text-2xl md:text-left lg:text-3xl wonder">
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