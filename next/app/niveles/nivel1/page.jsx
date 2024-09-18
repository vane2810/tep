// Página de inicio del NIVEL 1
"use client";
import React, { useState, useEffect } from "react";
import Volver from "@/components/botonVolver";
import Link from 'next/link';
import { SeparadorAmarillo, SeparadorRosa, SeparadorAzul } from "@/components/separador";
import useSession from '@/hooks/useSession';
import Typewriter from "@/components/typeWriter";
import '@/styles/animacion.css';
import Botones from '@/components/templates/niveles/botonStructure'

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
    <div className="flex justify-center items-center bg-gradient-to-r from-purple-900 via-indigo-900 to-black h-screen text-white">
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
      <SeparadorAzul />
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
                src="/img/personajes/niveles/bienvenida/mundito1.png"
                alt="Nivel 1"
                className="mr-10 w-auto h-64 animate-tambaleo"
              />
              <p className="text-3xl text-black text-left md:text-3xl super">
                ¡BIENVENIDOS AL NIVEL I! <br /> PLANETA CELESTIA
              </p>
            </div>
          </div>

          {/* Juego Introductorio */}
          <div className="flex flex-col justify-center items-center mt-8 md:mt-0 p-4 w-full md:w-1/4">
            <Link href="/games/lvl1/intro">
              <img
                src="/img/home/juego_intro.png"
                alt="Juego Introductorio"
                className="w-36 md:w-44 lg:w-52 xl:w-60 animate-float"
              />
            </Link>
          </div>
        </div>
      </section>

      <SeparadorAzul />
      <Botones
        mate="/niveles/nivel1/mate"
        lenguaje="/niveles/nivel1/lenguaje"
        sociales="/niveles/nivel1/sociales"
        ingles="/niveles/nivel1/ingles"
      />
      <SeparadorAzul />

    </main>
  );
}
