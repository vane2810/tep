// Página de inicio del NIVEL 2
"use client";
import React, { useState, useEffect } from "react";
import Volver from "@/components/botonVolver";
import Link from 'next/link';
import { SeparadorAzul } from "@/components/separador";
import useSession from '@/hooks/useSession';
import Typewriter from "@/components/typeWriter";
import '@/styles/animacion.css';
import Botones from "@/components/templates/niveles/botonStructure";

export default function Nivel2() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { session } = useSession();

  const fullText = "  ¡Hola, pequeños genios! Bienvenidos al Nivel 2  ¡Vamos a aprender y a jugar!";
  const images = [
    "/img/personajes/niveles/bienvenida/munditok1.png",
    "/img/personajes/niveles/bienvenida/munditok2.png",
    "/img/personajes/niveles/bienvenida/munditok3.png"
  ];

  useEffect(() => {
    if (session) {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');

      if (!hasSeenWelcome) {
        setShowWelcome(true);
        const timeout = setTimeout(() => {
          localStorage.setItem('hasSeenWelcome', 'true');
          setShowWelcome(false);
          setIsVerifying(false);
        }, 10000);

        const imageInterval = setInterval(() => {
          setCurrentImageIndex(prev => (prev + 1) % images.length);
        }, 4000);

        return () => {
          clearTimeout(timeout);
          clearInterval(imageInterval);
        };
      } else {
        setIsVerifying(false);
      }
    } else {
      setIsVerifying(false);
    }
  }, [session]);

  if (isVerifying) {
    return null;
  }

  return showWelcome ? (
   <div className="flex justify-center items-center bg-gradient-to-r from-orange-300 via-yellow-300 to-red-400 h-screen text-white">  
      <div className="text-center">
        <img
          src={images[currentImageIndex]}
          alt="Welcome"
          className="mx-auto mb-4 w-auto h-64"
        />
        <div className="font-bold text-3xl story">
          <Typewriter text={fullText} speed={80} />
        </div>

      </div>
    </div>
  ) : (
    <main>
      <SeparadorAzul/>
      <section>
        {/* Volver */}
        {!session && (
          <Volver href="/" title="Volver a la página de inicio" />
        )}
        <div className="flex md:flex-row flex-col justify-center items-center p-4 w-full">
          {/* Celestia */}
          <div className="flex justify-center items-center p-4 w-full md:w-3/4">
            <div className="flex items-center">
              <img
                src="/img/personajes/niveles/bienvenida/munditok1.png"
                alt="Nivel 1"
                className="mr-10 w-auto h-64 animate-tambaleo"
              />
              <p className="text-3xl text-black text-left md:text-3xl super">
                ¡BIENVENIDOS AL NIVEL II! <br /> PLANETA KAORI
              </p>
            </div>
          </div>

          {/* Juego Introductorio */}
          <div className="flex flex-col justify-center items-center mt-8 md:mt-0 p-4 w-full md:w-1/4">
            <Link href="/games/lvl2/intro">
              <img
                src="/img/home/juego_intro.png"
                alt="Juego Introductorio"
                className="w-36 md:w-44 lg:w-52 xl:w-60 animate-float"
              />
            </Link>
          </div>
        </div>
      </section>

      <SeparadorAzul/>
      <Botones
        mate="/niveles/nivel2/mate"
        lenguaje="/niveles/nivel2/lenguaje"
        sociales="/niveles/nivel2/sociales"
        ingles="/niveles/nivel2/ingles"
      />
      <SeparadorAzul/>

    </main>
  );
}
