// Página de Inicio

import React from "react";
import Styles from "../styles/globals.css";
import Carousel from "../components/carousel";
import { SeparadorRosa } from "../components/separador";
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('../components/video'), { ssr: false });

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes flyIn {
    from {
      transform: translateX(-100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes tumble {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 2s ease-in-out;
  }
  
  .animate-flyIn {
    animation: flyIn 2s ease-in-out;
  }
  
  .animate-tumble {
    animation: tumble 2s ease-in-out infinite;
  }
`;

export default function HomePage() {
  return (
    <main>
      <style>{styles}</style>
      <SeparadorRosa />
      {/* Bienvenida de Starly */}
      <div className="flex justify-center items-center mt-10 mb-10">
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
          className="h-40 w-auto mr-10 ml-10"
        />
        {/* Carrusel (falta) */}
        <Carousel />
      </div>
      <SeparadorRosa />
    </main>
  );
}
