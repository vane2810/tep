// Página de inicio del NIVEL 1
"use client";
import React, { useState, useEffect } from "react";
import Volver from "@/components/botonVolver";
import Link from 'next/link';
import { SeparadorAmarillo, SeparadorRosa, SeparadorAzul } from "@/components/separador";
import useSession from '@/hooks/useSession';
import Typewriter from "@/components/typeWriter";
import '@/styles/animacion.css';

export default function Nivel1() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { session } = useSession();

  const fullText = "  ¡Hola, pequeños genios! Bienvenidos al Nivel 1  ¡Vamos a aprender y a jugar!";
  const images = [
    "/img/personajes/niveles/bienvenida/mundito1.png",
    "/img/personajes/niveles/bienvenida/mundito2.png",
    "/img/personajes/niveles/bienvenida/mundito3.png"
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
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-white">
      <div className="text-center">
        <img
          src={images[currentImageIndex]}
          alt="Welcome"
          className="h-64 w-auto mb-4 mx-auto"
        />
        <div className="text-3xl font-bold story">
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
        <div className="w-full flex flex-col md:flex-row items-center justify-center p-4">
          {/* Celestia */}
          <div className="w-full md:w-3/4 flex items-center justify-center p-4">
            <div className="flex items-center">
              <img
                src="/img/personajes/niveles/bienvenida/mundito1.png"
                alt="Nivel 1"
                className="h-64 w-auto animate-tambaleo mr-10"
              />
              <p className="text-black super text-3xl md:text-3xl text-left">
                ¡BIENVENIDOS AL NIVEL I! <br /> PLANETA CELESTIA
              </p>
            </div>
          </div>

          {/* Juego Introductorio */}
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center p-4 mt-8 md:mt-0">
            <Link href="/games/lvl1/intro">
              <img
                src="/img/home/juego_intro.png"
                alt="Juego Introductorio"
                className="w-36 md:w-44 lg:w-52 xl:w-60  animate-float"
              />
            </Link>
          </div>
        </div>
      </section>

      <SeparadorAzul/>
      <section className="mt-10">
        <div className="flex justify-center items-center mb-10">
          <Link href="/niveles/nivel1/mate">
            <img
              src="/img/personajes/donkey/donkeyboton.png"
              alt="Matematica"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
            />
          </Link>
        
          <Link href="/niveles/nivel1/lenguaje">
            <img
              src="/img/personajes/principe/principeboton.png"
              alt="Lenguaje"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
            />
          </Link>
          <Link href="/niveles/nivel1/ingles">
            <img
              src="/img/personajes/griffit/griffitboton.png"
              alt="Ingles"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 rounded-full transition-transform transform hover:scale-105 hover:shadow-lg "
            />
          </Link>
          <Link href="/niveles/nivel1/sociales">
            <img
              src="/img/personajes/burbuja/burbujaboton.png"
              alt="Sociales"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
            />
          </Link>
        </div>
      </section>
      <SeparadorAzul/>

    </main>
  );
}
