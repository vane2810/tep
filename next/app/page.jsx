// Página de Inicio
import React from "react";
import Carousel from "../components/carousel";
import { SeparadorRosa } from "../components/separador";
import Typewriter from "../components/typeWriter";
import '../styles/animacion.css';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('../components/video'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <SeparadorRosa />
      
      {/* Bienvenida de Starly */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-10">
        <img
          src="/img/page/starly.png"
          alt="Starly"
          className="h-32 w-auto mb-6 md:mb-0 md:h-40 md:mr-10 md:ml-10 animate-tumble"
        />
        <div className="font-story font-bold">
          <Typewriter
            text="¡ Hola! Soy Starly y te estaré acompañando en esta aventura"
            speed={40}
          />
        </div>
      </div>
      
      <SeparadorRosa />
      
      <div className="flex justify-center">
        {/* Botones (Planetas) */}
        <NoSSR />
      </div>
      
      <SeparadorRosa />
      
      {/* Starly */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-10">
        <img
          src="/img/page/starly.png"
          alt="Animated Image"
          className="h-32 w-auto mb-6 md:mb-0 md:h-40 md:mr-10 md:ml-10 animate-flyIn"
        />
        <Carousel />
      </div>
      
      <SeparadorRosa />
    </main>
  );
}


