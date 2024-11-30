// Juego Introductorio -  Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";
import '@/styles/animacion.css'
import Volver from '@/components/elements/botonVolver';

const Game = dynamic(() => import('@/components/minigame/lvl1/intro/game'), { ssr: false });

const IntroGame1 = () => {
    return (
        <main>
            <SeparadorRosa />
            {/* Volver */}
            <Volver href="/niveles/nivel1" />
            <div className="flex md:flex-row flex-col justify-center items-center mt-10 mb-10">
                <h1 className="ml-10 font-bold text-2xl text-center story">Bienvenido a Juegos Introductorios</h1>
                <img
                    src="/img/personajes/starly/starly.webp"
                    alt="Starly"
                    className="md:mr-10 mb-6 md:mb-0 md:ml-10 w-auto h-32 md:h-40 animate-tumble"
                />
            </div>

            <div className="my-40">
                <Game />
            </div>
            <SeparadorRosa />
        </main>
    );
};

export default IntroGame1;