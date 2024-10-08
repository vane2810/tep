// Juego Introductorio -  Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";
import '@/styles/animacion.css'
import Volver from '@/components/botonVolver';

const Game = dynamic(() => import('@/components/minigame/lvl1/intro/game'), { ssr: false });

const IntroGame1 = () => {
    return (
        <main>
            <SeparadorRosa />
            {/* Volver */}
            <Volver href="/niveles/nivel1" />
            <div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-10">
                <h1 className="ml-10 story text-2xl font-bold text-center">Bienvenido a Juegos Introductorios</h1>
                <img
                    src="/img/personajes/starly/starly.png"
                    alt="Starly"
                    className="h-32 w-auto mb-6 md:mb-0 md:h-40 md:mr-10 md:ml-10 animate-tumble"
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