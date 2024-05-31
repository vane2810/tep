// Página de Inicio

import React from "react";
import Styles from "../styles/globals.css";
import Carousel from "../components/carousel";
import { SeparadorRosa } from "../components/separador";
import dynamic from 'next/dynamic'


{/*Importación del componente video / como cliente*/}
const NoSSR = dynamic(() => import('../components/video'), { ssr: false })

 
export default function HomePage(){
  return (
    
      <main>
        <SeparadorRosa/>
      {/* Bienvenida de Starly*/}
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
      </div>
      <SeparadorRosa/>
      <div>
        {/* Botones (Planetas)*/}
        <NoSSR/>
      </div>
      <SeparadorRosa/>
       {/* Starly */}
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
         {/* Carrusel (falta)*/}
        <Carousel/>
      </div>
      <SeparadorRosa/>
    </main>
    
  );
}