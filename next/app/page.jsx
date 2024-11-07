// Página de Inicio
import React from "react";
import Carousel from '@/components/home/carousel';
import InicioPage from "@/components/home/homepage";

export default function HomePage() {
  return (
    <main 
      className="flex flex-col justify-center items-center bg-cover bg-center w-full min-h-screen" 
      style={{ backgroundImage: "url('/img/inicio/fondo8n.png')" }}
    >
      {/* Componente Video  */}
      <InicioPage />

      {/* Carousel*/}
      <div className="mt-8"> 
        <Carousel />
      </div>
    </main>
  );
}
