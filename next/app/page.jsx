// Página de Inicio
import React from "react";
import Carousel from "../components/carousel";
import { SeparadorRosa } from "../components/separador";
import Typewriter from "../components/typeWriter";
import '../styles/animacion.css';
import dynamic from 'next/dynamic';

const Video = dynamic(() => import('../components/video'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <SeparadorRosa />
      
      {/* Bienvenida de Starly */}
      <div className="flex md:flex-row flex-col justify-center items-center mt-10 mb-10">
        <img
          src="/img/personajes/starly/starly.png"
          alt="Starly"
          className="md:mr-10 mb-6 md:mb-0 md:ml-10 w-34 h-32 md:h-40 animate-tumble"
        />
        <div className="font-bold text-2xl wonder">
          <Typewriter
            text="¡ Hola! Soy Starly y te estaré acompañando en esta aventura"
            speed={40}
          />
        </div>
      </div>

      
      <SeparadorRosa />
      
      <div className="flex justify-center">
        {/* Botones (Planetas) */}
        <Video />
      </div>
      
      <SeparadorRosa />
      
      {/* Starly */}
      <div className="flex md:flex-row flex-col justify-center items-center mt-10 mb-10">
        <img
          src="/img/personajes/starly/starly.png"
          alt="Starly"
          className="md:mr-10 mb-6 md:mb-0 md:ml-10 w-auto h-32 md:h-40 animate-flyIn"
        />
        <Carousel />
      </div>
      <SeparadorRosa />
    </main>
  );
}