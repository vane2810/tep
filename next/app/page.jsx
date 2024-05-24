import React from "react";
import Navbar from "../components/navbar"; // Importa tu componente Navbar aquí
import Styles from "../styles/globals.css";
import Video from "../components/video"
import Carousel from "../components/carousel";
import { SeparadorRosa } from "../components/separador";
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux';
import store from '../redux/store'; 


{/*Importación del componente video / como cliente*/}
const NoSSR = dynamic(() => import('../components/video'), { ssr: false })
 

export default function HomePage(){
  return (
    
      <main>
      {/* Agrega el Navbar al inicio de tu página */}
      <SeparadorRosa/>
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
      </div>
      <SeparadorRosa/>
      <div>
        <NoSSR/>
      </div>
      <SeparadorRosa/>
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
        <Carousel/>
      </div>
      <SeparadorRosa/>
    </main>
    
  );
}
