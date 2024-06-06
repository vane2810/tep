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
      <div className="flex justify-center items-center mt-10 mb-10">
        <Typewriter text="¡ Hola! Soy Starly y te estaré acompañando en esta aventura" speed={100} />
        <img
          src="/img/page/starlysaludo.png"
          alt="Animated Image"
          className="h-56 w-auto mr-15 ml-15 animate-tumble"
        />
      </div>
      <SeparadorRosa />
      <div>
        {/* Botones (Planetas) */}
        <NoSSR />
      </div>
      <SeparadorRosa />
      {/* Starly */}
      <div className="flex justify-center items-center mt-10 mb-10">
        <img
          src="/img/page/starly.png"
          alt="Animated Image"
          className="h-40 w-auto mr-10 ml-10 animate-flyIn"
        />
        <Carousel />
      </div>
      <SeparadorRosa />
    </main>
  );
}
